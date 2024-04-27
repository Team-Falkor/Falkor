import IGDBImage from '@/components/IGDBImage';
import BannerSkeleton from '@/components/skeletons/banner';
import { buttonVariants } from '@/components/ui/button';
import { igdb } from '@/utils/api/igdb';
import { IGDBReturnDataTypeCover } from '@/utils/api/igdb/types';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

const Banner = () => {
  const [screenshots, setScreenshots] = useState<IGDBReturnDataTypeCover[]>();

  const fetch = async () => {
    const data = await igdb.topRated();
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ['igdb', 'Banner'],
    queryFn: fetch,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  let start = 1;
  let howMany = 3;

  useEffect(() => {
    if (!data || !data[0].screenshots) return;

    const extractedArr = data[0].screenshots?.filter((_item, index) => {
      return index >= start && index < howMany + start;
    });

    setScreenshots(extractedArr);
  }, [data]);

  if (isPending) return <BannerSkeleton />;

  if (error) return <div>Error</div>;

  const item = data[0];

  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden rounded-lg h-80">
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidde">
          <span className="absolute w-full h-full z-[1] from-background to-transparent bg-gradient-to-tr" />
          <IGDBImage
            imageId={item.cover.image_id}
            className="object-cover w-full h-full"
            alt={item.name}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-end w-full h-full gap-1 p-4">
          <h1 className="text-2xl font-bold text-white">{item.name}</h1>
          <p className="text-sm text-gray-400 line-clamp-4">{item.storyline ?? item.summary ?? '??'}</p>
          <div className="flex flex-row justify-end">
            <div className="flex flex-row items-end justify-between w-full">
              <div className="flex flex-row justify-start gap-3 mt-3">
                {screenshots?.map((screenshot) => (
                  <IGDBImage
                    imageSize="720p"
                    key={screenshot.id}
                    imageId={screenshot.image_id}
                    className="object-cover rounded-md w-52 aspect-video"
                    alt={item.name}
                  />
                ))}
              </div>
              <div className="flex flex-row gap-3">
                <Link className={buttonVariants({ variant: 'secondary' })}>Trailer</Link>
                <Link
                  className={buttonVariants({ variant: 'secondary' })}
                  to="/info/$id"
                  params={{ id: item.id.toString() }}
                >
                  More Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
