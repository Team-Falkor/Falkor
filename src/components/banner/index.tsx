import BannerCard from "@/components/cards/bannerCard";
import BannerSkeleton from "@/components/skeletons/banner";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { igdb } from "@/utils/api/igdb";
import { useQuery } from "@tanstack/react-query";

const Banner = () => {
  const fetch = async () => {
    const data = await igdb.topRated();
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["igdb", "Banner"],
    queryFn: fetch,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isPending) return <BannerSkeleton />;

  if (error) return <div>Error</div>;

  return (
    <div className="w-full">
      <CarouselContent>
        {data?.map((game) => (
          <CarouselItem key={game.id}>
            <BannerCard {...game} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </div>
  );
};

export default Banner;
