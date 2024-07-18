import Banner from "@/components/banner";
import CarouselButton from "@/components/info/carouselButton";
import { Carousel } from "@/components/ui/carousel";
import MainContainer from "@/containers/mainContainer";
import RowContainer from "@/containers/row";
import { createLazyFileRoute } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <MainContainer>
      <div>
        <Carousel
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          <h3 className="pb-2 font-mono text-lg font-medium leading-6 flex justify-between items-center mb-2">
            Top Rated
            <div>
              <CarouselButton direction="left" />
              <CarouselButton direction="right" />
            </div>
          </h3>
          <Banner />
        </Carousel>
      </div>

      <RowContainer title="New Releases" dataToFetch="newReleases" />

      <RowContainer title="Most Anticipated" dataToFetch="mostAnticipated" />
    </MainContainer>
  );
}
