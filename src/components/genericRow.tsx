import DefaultCard from '@/components/cards/defaultCard';
import GenericRowSkeleton from '@/components/skeletons/genericRow';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { igdb } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

interface GenericRowProps {
  dataToFetch: 'mostAnticipated' | 'topRated' | 'newReleases';
}

const GenericRow: FC<GenericRowProps> = ({ dataToFetch }) => {
  const fetcher = async () => {
    const data = await igdb[dataToFetch]();
    return data;
  };

  const { data, isPending, error } = useQuery({
    queryKey: ['igdb', dataToFetch],
    queryFn: fetcher,
  });

  if (isPending) return <GenericRowSkeleton />;
  if (error) return null;

  return (
    <Carousel
      opts={{
        skipSnaps: true,
      }}
    >
      <CarouselContent>
        {data?.map((game) => (
          <CarouselItem
            key={game.id}
            className="md:basis-[12%] basis-1/6 2xl:basis-[14.5%] xl:basis-[17.77%]"
          >
            <DefaultCard
              key={game.id}
              wantCountdown={dataToFetch === 'mostAnticipated'}
              {...game}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default GenericRow;
