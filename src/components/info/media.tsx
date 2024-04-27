import IGDBImage from '@/components/IGDBImage';
import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { FC, useMemo } from 'react';

const GameMedia: FC<IGDBReturnDataType> = (props) => {
  const { name, screenshots: ss, videos } = props;

  const screenshots = useMemo(() => {
    return ss?.slice(0, 4);
  }, [ss]);

  return (
    <div>
      <h1 className="pb-4 text-xl font-medium">Media</h1>

      <iframe
        className="aspect-video h-[500px] w-full rounded-lg"
        src={`https://www.youtube.com/embed/${videos?.[0].video_id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <div className="flex gap-2 mt-5">
        <div className="w-1/2">
          <IGDBImage
            imageId={screenshots && screenshots[0] ? screenshots[0].image_id : ''}
            alt={name}
            className="h-full max-h-[310px] w-full rounded-lg object-cover"
          />
        </div>

        <div className="w-1/2">
          <ul className="grid grid-cols-2 gap-2">
            {!!screenshots &&
              screenshots.map((screenshot) => {
                return (
                  <li key={screenshot.image_id}>
                    <IGDBImage
                      key={screenshot.image_id}
                      imageId={screenshot.image_id}
                      alt={name}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameMedia;
