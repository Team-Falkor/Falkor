import IGDBImage from '@/components/IGDBImage';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { DialogContent } from '@/components/ui/dialog';
import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { FC } from 'react';

interface MediaDialogProps {
  media: IGDBReturnDataType['screenshots'];
  clickedId: string | null;
}

const MediaDialog: FC<MediaDialogProps> = ({ media }) => {
  return (
    <DialogContent
      className="bg-transparent border-none "
      showCloseButton={false}
    >
      <div className="absolute inset-0 flex items-center justify-center w-screen h-sc">
        <Carousel className="w-full max-w-4xl min-w-full bg-red-300">
          <CarouselContent>
            {media?.map((media) => (
              <CarouselItem key={media.id}>
                <div className="w-full p-1 overflow-hidden rounded-md aspect-video">
                  <IGDBImage
                    imageId={media.image_id}
                    alt={media.url}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
        <CarouselNext /> */}
        </Carousel>
      </div>
    </DialogContent>
  );
};

export default MediaDialog;
