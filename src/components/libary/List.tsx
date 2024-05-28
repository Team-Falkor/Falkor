import DefaultCard from '@/components/cards/defaultCard';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import useCollection from '@/hooks/useCollection';
import { useQuery } from '@tanstack/react-query';
import { FunctionComponent } from 'react';

interface ListProps {
  name: string;
  id: string;
}

const List: FunctionComponent<ListProps> = ({ name }) => {
  const { getCollectionAndGames } = useCollection(name);

  const fetcher = async () => {
    const data = await getCollectionAndGames();
    return data;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ['collection', name],
    queryFn: fetcher,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <h3 className="pb-2 font-mono text-lg font-medium leading-6 capitalize truncate">{data?.name}</h3>

      <Carousel>
        <CarouselContent>
          {!!data?.games ? (
            data?.games.map(
              (game) =>
                !!game && (
                  <CarouselItem
                    className="md:basis-[16%] sm:basis-1/6 lg:basis-[14.5%]"
                    key={game.id}
                  >
                    <DefaultCard {...game} />
                  </CarouselItem>
                ),
            )
          ) : (
            <div className="text-center">No games in this collection</div>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default List;
