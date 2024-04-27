import { InfoProps } from '@/@types';
import IGDBImage from '@/components/IGDBImage';
import DownloadDialog from '@/components/info/downloadDialog';
import QuickInfo from '@/components/info/quickInfo';
import { Skeleton } from '@/components/ui/skeleton';
import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { FC } from 'react';

type InfoTopProps = InfoProps & {
  data: IGDBReturnDataType | undefined;
  isReleased: boolean;
};

const InfoTop: FC<InfoTopProps> = (props) => {
  const { data, isReleased, isPending, error } = props;

  if (error) return null;

  return (
    <div className="sm:-mt-28 sm:flex sm:items-start sm:space-x-5">
      <div className="relative flex">
        {isPending && <Skeleton className="rounded-lg w-[230px] h-80" />}
        {!isPending && (
          <IGDBImage
            imageId={data!.cover?.image_id ?? ''}
            alt={data!.name}
            className="object-cover rounded-lg h-80"
            imageSize={'cover_big'}
          />
        )}
      </div>

      <div className="w-full mt-16 sm:min-w-0 sm:flex-1 sm:items-center sm:justify-start sm:pb-1">
        <section className="flex items-end justify-between w-full gap-3">
          {isPending && <Skeleton className="w-56 h-10" />}
          {!isPending && <h1 className="text-2xl font-bold truncate">{data!.name}</h1>}
          {isPending && <Skeleton className="w-32 h-10" />}
          {!isPending && (
            <DownloadDialog
              title={data!.name}
              isReleased={isReleased}
              websites={data!.websites}
            />
          )}
        </section>

        <div className="mt-5">
          <QuickInfo
            data={data}
            error={error}
            isPending={isPending}
            isReleased={isReleased}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoTop;
