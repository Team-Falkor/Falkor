import DefaultCard from '@/components/cards/defaultCard';
import CarouselButton from '@/components/info/carouselButton';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { FilterOutNonePcGames } from '@/utils';
import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { FC, useMemo } from 'react';

interface SimilarGamesProps {
  data: IGDBReturnDataType['similar_games'];
}

const SimilarGames: FC<SimilarGamesProps> = ({ data }) => {
  const items = useMemo(() => {
    return FilterOutNonePcGames(data);
  }, [data]);

  if (!items?.length) return null;

  return (
    <div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <div className="flex justify-between">
          <h1 className="text-xl font-medium capitalize">You may also like</h1>
          <div>
            <CarouselButton direction="left" />
            <CarouselButton direction="right" />
          </div>
        </div>
        <CarouselContent>
          {items.map((game) => (
            <CarouselItem
              key={game.id}
              className="md:basis-[11%] basis-1/5 2xl:basis-[16.7%] xl:basis-[17.7%]"
            >
              <DefaultCard
                key={game.id}
                {...game}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default SimilarGames;
