import DefaultCard from '@/components/cards/defaultCard';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { igdb } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { FunctionComponent } from 'react';

interface ListProps {
  name: string;
  id: string;
  items: any[];
}

const List: FunctionComponent<ListProps> = ({ name }) => {
  const fetcher = async () => {
    const data = await igdb.mostAnticipated();
    return data;
  };

  const { data, isPending, error } = useQuery({
    queryKey: ['igdb', name],
    queryFn: fetcher,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <h3 className="pb-2 font-mono text-lg font-medium leading-6 capitalize truncate">{name}</h3>

      <Carousel>
        <CarouselContent>
          {data.map((game) => (
            <CarouselItem
              className="md:basis-1/6 lg:basis-1/6"
              key={game.id}
            >
              <DefaultCard {...game} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default List;
