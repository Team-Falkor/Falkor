import SideNavigationDownloadsPopoverContent from "@/components/sideNavigation/downloads/content";
import NavItem from "@/components/sideNavigation/item";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useLanguageContext } from "@/contexts/languageContext";
import { ArrowDownToLine } from "lucide-react";
import { useState } from "react";

const SideNavigationDownloads = () => {
  const { t } = useLanguageContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <NavItem
          type="button"
          title={t("downloads")}
          icon={<ArrowDownToLine />}
          active={isOpen}
        />
      </PopoverTrigger>
      <SideNavigationDownloadsPopoverContent />
    </Popover>
  );
};

export default SideNavigationDownloads;
