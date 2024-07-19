import PluginDisplay from "@/components/setting/tabs/plugins/pluginDisplay";
import PluginsSort from "@/components/setting/tabs/plugins/sort";
import SettingTitle from "@/components/setting/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguageContext } from "@/contexts/languageContext";
import { FolderDown, Plus } from "lucide-react";
import { FC, useState } from "react";

interface GeneralSettingProps {
  index: number;
  currentIndex: number;
}

export type SortBy =
  | "alphabetic-asc"
  | "alphabetic-desc"
  | "popularity-asc"
  | "popularity-desc";

const Plugins: FC<GeneralSettingProps> = ({ index, currentIndex }) => {
  const { t } = useLanguageContext();

  const [showRows, setShowRows] = useState(true);
  const [sortBy, setSortBy] = useState<SortBy>("alphabetic-asc");

  if (index !== currentIndex) return null;

  return (
    <div className="h-full overflow-hidden">
      <SettingTitle>{t("Settings.titles.plugins")}</SettingTitle>

      <ScrollArea className="w-full h-full pt-2 pb-16">
        <div className="px-5 py-2 ">
          <div className="flex justify-between">
            <div className="flex w-1/2 gap-2">
              <Input
                placeholder={t("what_plugin_are_you_looking_for")}
                type="text"
              />

              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant={"ghost"} size={"icon"}>
                      <Plus />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{t("add_local_plugin")}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <Button variant={"ghost"} size={"icon"}>
                      <FolderDown />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {t("add_custom_plugin_repository")}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <PluginsSort
              showRows={showRows}
              setShowRows={setShowRows}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>

          <PluginDisplay
            showRows={showRows}
            setShowRows={setShowRows}
            sortBy={sortBy}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default Plugins;
