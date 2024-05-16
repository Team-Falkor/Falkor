import IGDBImage from '@/components/IGDBImage';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IGDBReturnDataType, SimilarGame } from '@/utils/api/igdb/types';
import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { FC } from 'react';

type DefaultCardProps = (IGDBReturnDataType | SimilarGame) & {
  wantCountdown?: boolean;
};

const DefaultCard: FC<DefaultCardProps> = ({ cover, name, id, genres, release_dates, wantCountdown }) => {
  const findReleaseDate = release_dates?.find((item) => item.platform === 6);

  return (
    <Card className="group relative m-0 mt-3 w-[200px] rounded-t-lg p-0 overflow-hidden">
      <CardContent className="p-0 m-0">
        <div className="relative overflow-hidden rounded-t-lg 2 group focus:outline-none dark:ring-offset-gray-900">
          <IGDBImage
            imageId={cover?.image_id ?? ''}
            alt={name}
            className="object-cover w-full transition duration-300 ease-out h-72 group-focus-within:scale-105 group-hover:scale-105 group-focus:scale-105"
          />
        </div>

        {/* <div className="absolute inset-0 z-10 flex items-center justify-center w-full h-full">
          {wantCountdown && !!findReleaseDate?.date && <Countdown date={new Date(findReleaseDate?.date * 1000)} />}
        </div> */}

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center transition duration-300 ease-out translate-y-full rounded opacity-0 cursor-pointer bg-slate-700 bg-opacity-80 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
          <div className="flex flex-col items-center justify-center w-full gap-4 p-2">
            <div className="flex flex-col w-full gap-1">
              <h4 className="font-medium text-center text-white whitespace-pre-line break-before-avoid">{name}</h4>

              {!!findReleaseDate && !!findReleaseDate?.date && (
                <div className="flex items-center justify-center">
                  <p className="text-xs text-slate-400">{dayjs(findReleaseDate?.date * 1000).format('MMMM D, YYYY')}</p>
                </div>
              )}

              <ul className="flex items-center justify-center w-full gap-1 px-2 text-xs text-slate-400 line-clamp-1">
                {!!genres?.length &&
                  genres.slice(0, 2).map((genre, i) => (
                    <li
                      className="whitespace-nowrap line-clamp-1"
                      key={i}
                    >
                      {genre.name}
                      {i !== genres.slice(0, 2).length - 1 ? ',' : ''}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <Link
            className={buttonVariants({
              variant: 'secondary',
              className: 'mt-5',
            })}
            to={`/info/$id`}
            params={{ id: id.toString() }}
          >
            More Info
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DefaultCard;
