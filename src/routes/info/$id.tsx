import IGDBImage from '@/components/IGDBImage';
import InfoBottom from '@/components/info/bottom';
import InfoMiddle from '@/components/info/middle';
import InfoTop from '@/components/info/top';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getUserCountry, itad } from '@/utils';
import { igdb } from '@/utils/api/igdb';
import { Mapping } from '@/utils/mapping';
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

  const fetcher = async () => {
    if (!data) return;
    const itadSearch = await itad.gameSearch(data?.name);
    console.log({ itadSearch });

    const mapping = new Mapping<any>(data?.name, itadSearch);
    const result = await mapping.compare();

    console.log({ result });
    if (result) {
      const local = await getUserCountry();
      const itadPrices = await itad.gamePrices([result.id], local);

      return itadPrices;
    }
  };

  const releaseDate = data ? data.release_dates?.find((item) => item.platform === 6) ?? data.release_dates?.[0] : null;
  const isReleased = !releaseDate ? false : !releaseDate?.date || releaseDate.date < Date.now() / 1000;

  const {
    data: itadData,
    isPending: itadPending,
    error: itadError,
  } = useQuery({
    queryKey: ['itad', 'prices', id],
    queryFn: fetcher,
    enabled: !!data && !isPending && isReleased,
  });

  // if (isPending) return <div>Loading...</div>;
  if (error) return null;

  return (
    <div className="relative w-full h-full pb-20 ">
      <div className="absolute top-0 left-0 z-10 mx-10 mt-3">
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
          <div className="relative w-full overflow-hidden rounded-b-lg h-96">
            <IGDBImage
              imageId={data?.screenshots?.[0]?.image_id ?? ''}
              alt={data?.name}
              className="relative z-0 object-cover w-full h-full overflow-hidden"
              imageSize="screenshot_big"
            />

            <span className="absolute inset-0 opacity-50 bg-gradient-to-t from-background to-transparent" />
          </div>
        )}
      </div>

      <div className="relative z-10 max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <InfoTop
          data={data}
          isReleased={isReleased}
          error={error}
          isPending={isPending}
          itadData={itadData}
          itadPending={itadPending}
          itadError={itadError}
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
