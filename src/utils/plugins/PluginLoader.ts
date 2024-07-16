import { fs } from "@tauri-apps/api";
import { appDataDir, join } from "@tauri-apps/api/path";

let instance: PluginLoader | null = null;

class PluginLoader {
  private plugins: any[] = [];
  private pluginPath: string | null = null;

  private initialized = false;

  constructor() {
    if (instance) return instance;

    instance = this;
    return instance;
  }

  async load() {
    try {
      await this.initialize();

      if (!this.pluginPath) return;

      // plugins are in their own folder
      const plugins = await fs.readDir(this.pluginPath);

      for (const folder of plugins) {
        if (!folder.name) continue;
        const pluginPath = await join(this.pluginPath, folder.name);

        // load index.js
        const file = await join(pluginPath, "index.js");
        if (await fs.exists(file)) {
          this.plugins.push(await import(file));
          continue;
        }
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to load plugins");
    }
  }

  async unload() {
    await this.initialize();

    try {
      for await (const plugin of this.plugins) await plugin.unload();

      this.plugins = [];
    } catch (error) {
      console.error(error);
      throw new Error("Failed to unload plugins");
    }
  }

  async delete(plugin_name: string) {
    try {
      await this.initialize();

      // check and remove from this.plugins

      const index = this.plugins.findIndex(
        (plugin) => plugin.metadata.name === plugin_name
      );
      if (index !== -1) this.plugins.splice(index, 1);

      if (!this.pluginPath) return;

      const pluginPath = await join(this.pluginPath, plugin_name);

      if (await fs.exists(pluginPath)) await fs.removeDir(pluginPath);
      else throw new Error("Failed to delete plugin");
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete plugin");
    }
  }

  async initialize() {
    if (this.initialized) return;
    try {
      const appDataPath = await appDataDir();

      if (!appDataPath) throw new Error("Failed to get appdata path");

      this.pluginPath = await join(appDataPath, "plugins");
      this.initialized = true;
    } catch (error) {
      console.error(error);
      this.initialized = false;
      throw new Error("Failed to get appdata path");
    }
  }
}

export default PluginLoader;
