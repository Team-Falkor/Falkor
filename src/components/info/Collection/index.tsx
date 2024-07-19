import CollectionDropdownContent from "@/components/info/Collection/content";
import NewCollectionDialogContent from "@/components/modals/newCollection";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IGDBReturnDataType } from "@/utils/api/igdb/types";
import { List } from "lucide-react";
import { FC, useState } from "react";

interface CollectionDropdownProps {
  game: IGDBReturnDataType;
}

const CollectionDropdown: FC<CollectionDropdownProps> = ({ game }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"secondary"} size={"icon"}>
            <List className="size-5" />
          </Button>
        </DropdownMenuTrigger>

        <CollectionDropdownContent game={game} />
      </DropdownMenu>

      <NewCollectionDialogContent
        open={openDialog}
        setOpen={setOpenDialog}
        games={[game.id]}
      />
    </Dialog>
  );
};

export default CollectionDropdown;
