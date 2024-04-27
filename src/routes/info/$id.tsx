import IGDBImage from '@/components/IGDBImage';
import InfoBottom from '@/components/info/bottom';
import InfoMiddle from '@/components/info/middle';
import InfoTop from '@/components/info/top';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { igdb } from '@/utils/api/igdb';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';

export const Route = createFileRoute('/info/$id')({
  component: Info,
});

function Info() {
  const { id } = Route.useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ['igdb', 'info', id],
    queryFn: async () => await igdb.info(id),
  });

  // if (isPending) return <div>Loading...</div>;
  if (error) return null;

  const releaseDate = data ? data.release_dates?.find((item) => item.platform === 6) ?? data.release_dates?.[0] : null;
  const isReleased = !releaseDate ? false : !releaseDate?.date || releaseDate.date < Date.now() / 1000;

  return (
    <div className="relative w-full h-full pb-20">
      <div className="absolute top-0 left-0 mx-10 mt-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => history.back()}
        >
          <ChevronLeft />
        </Button>
      </div>

      <div>
        {!!isPending ? (
          <Skeleton className="w-full rounded-lg h-96" />
        ) : (
          <IGDBImage
            imageId={data?.screenshots?.[0]?.image_id ?? ''}
            alt={data?.name}
            className="object-cover w-full overflow-hidden rounded-b-lg h-96"
            imageSize="screenshot_big"
          />
        )}
      </div>

      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <InfoTop
          data={data}
          isReleased={isReleased}
          error={error}
          isPending={isPending}
        />

        {!isPending && (
          <>
            <InfoMiddle
              {...data}
              error={error}
              isPending={isPending}
            />

            <InfoBottom
              {...data}
              error={error}
              isPending={isPending}
            />
          </>
        )}
      </div>
    </div>
  );
}
