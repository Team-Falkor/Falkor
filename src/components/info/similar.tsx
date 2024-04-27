import DefaultCard from '@/components/cards/defaultCard';
import CarouselButton from '@/components/info/carouselButton';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { FC } from 'react';

interface SimilarGamesProps {
  data: IGDBReturnDataType['similar_games'];
}

const SimilarGames: FC<SimilarGamesProps> = ({ data }) => {
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
          {data.map((game) => (
            <CarouselItem
              key={game.id}
              className="md:basis-1/5 lg:basis-1/5"
            >
              <DefaultCard
                name={game.name}
                cover={game.cover}
                screenshots={game.screenshots}
                id={game.id.toString()}
                genres={game.genres}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default SimilarGames;
