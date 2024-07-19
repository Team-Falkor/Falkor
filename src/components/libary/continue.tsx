import NewGameCard from "@/components/libary/newGame";
import NewGameModalContent from "@/components/sideNavigation/newGame/modal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useLanguageContext } from "@/contexts/languageContext";
import { FC, useState } from "react";

const ContuinePlaying: FC = () => {
  const { t } = useLanguageContext();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col w-full gap-4">
      <h3 className="pb-2 font-mono text-lg font-medium leading-6">
        {t("continue_playing")}
      </h3>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <NewGameCard />
        </DialogTrigger>

        <NewGameModalContent setOpen={setOpen} />
      </Dialog>

      {/* <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, i) => (
            <CarouselItem
              key={i}
              className="md:basis-1/5 lg:basis-1/5"
            >
              <RectangleCard />
            </CarouselItem>
          ))}
        </CarouselContent> */}
      {/* </Carousel> */}
    </div>
  );
};

export default ContuinePlaying;
