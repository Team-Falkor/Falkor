import BannerCard from '@/components/cards/bannerCard';
import BannerSkeleton from '@/components/skeletons/banner';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { igdb } from '@/utils/api/igdb';
import { useQuery } from '@tanstack/react-query';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

const Banner = () => {
  const fetch = async () => {
    const data = await igdb.topRated();
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ['igdb', 'Banner'],
    queryFn: fetch,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  if (isPending) return <BannerSkeleton />;

  if (error) return <div>Error</div>;

  return (
    <div className="w-full">
      <Carousel
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        <CarouselContent>
          {data?.map((game) => (
            <CarouselItem key={game.id}>
              <BannerCard {...game} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Banner;
