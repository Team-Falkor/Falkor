import IGDBImage from '@/components/IGDBImage';
import { IGDBReturnDataTypeCover } from '@/utils/api/igdb/types';
import { FunctionComponent, useMemo } from 'react';

interface MediaScreenshotsProps {
  screenshots: IGDBReturnDataTypeCover[] | undefined;
  name: string;
}

const MediaScreenshots: FunctionComponent<MediaScreenshotsProps> = ({ screenshots: ss, name }) => {
  const screenshots = useMemo(() => {
    return ss?.slice(0, 4);
  }, [ss]);

  if (!screenshots?.length) return null;

  return (
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
  );
};

export default MediaScreenshots;
