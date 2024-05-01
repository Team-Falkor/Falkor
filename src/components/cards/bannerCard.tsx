import IGDBImage from '@/components/IGDBImage';
import { buttonVariants } from '@/components/ui/button';
import { IGDBReturnDataType, IGDBReturnDataTypeCover } from '@/utils/api/igdb/types';
import { Link } from '@tanstack/react-router';
import { FC, useEffect, useState } from 'react';

const BannerCard: FC<IGDBReturnDataType> = ({ screenshots: ss, cover, name, summary, storyline, id }) => {
  const [screenshots, setScreenshots] = useState<IGDBReturnDataTypeCover[]>();

  let start = 1;
  let howMany = 3;

  useEffect(() => {
    if (screenshots) return;

    const extractedArr = ss?.filter((_item, index) => {
      return index >= start && index < howMany + start;
    });

    setScreenshots(extractedArr);
  }, [screenshots]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg h-80">
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidde">
        <span className="absolute w-full h-full z-[1] from-background to-transparent bg-gradient-to-tr" />
        <IGDBImage
          imageId={cover.image_id}
          className="object-cover w-full h-full"
          alt={name}
        />
      </div>

      <div className="relative z-10 flex flex-col justify-end w-full h-full gap-1 p-4">
        <h1 className="text-2xl font-bold text-white">{name}</h1>
        <p className="text-sm text-gray-400 line-clamp-4">{storyline ?? summary ?? '??'}</p>
        <div className="flex flex-row justify-end">
          <div className="flex flex-row items-end justify-between w-full">
            <div className="flex flex-row justify-start gap-3 mt-3">
              {screenshots?.map((screenshot) => (
                <IGDBImage
                  imageSize="720p"
                  key={screenshot.id}
                  imageId={screenshot.image_id}
                  className="object-cover rounded-md w-52 aspect-video"
                  alt={name}
                />
              ))}
            </div>
            <div className="flex flex-row gap-3">
              <Link className={buttonVariants({ variant: 'secondary' })}>Trailer</Link>
              <Link
                className={buttonVariants({ variant: 'secondary' })}
                to="/info/$id"
                params={{ id: id.toString() }}
              >
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
