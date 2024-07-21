import {
  isPermissionGranted,
  Options,
  requestPermission,
  sendNotification,
} from "@tauri-apps/api/notification";
import { ExternalToast, toast } from "sonner";

class NotificationsHelper {
  private isPermissionGranted: boolean | null = null;

  init = async () => {
    if (this.isPermissionGranted !== null) return;

    const permissionGranted = await isPermissionGranted();
    this.isPermissionGranted = permissionGranted ?? false;
  };

  requestPermission = async () => {
    await this.init();

    if (this.isPermissionGranted) return;

    const permissionGranted = await requestPermission();
    const permission = permissionGranted === "granted" ?? false;
    this.isPermissionGranted = permission;

    if (permission) toast.success("Notifications permission granted.");
    return permission;
  };

  notify = async (message: string | Options, data?: ExternalToast) => {
    await this.requestPermission();

    toast(typeof message === "string" ? message : message.title, data);

    if (!this.isPermissionGranted) {
      return toast.error(
        "Please allow notifications in order to receive updates."
      );
    }

    sendNotification(message);
  };
}

export default new NotificationsHelper();
