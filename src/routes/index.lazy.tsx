import Banner from "@/components/banner";
import MainContainer from "@/components/containers/mainContainer";
import RowContainer from "@/components/containers/row";
import CarouselButton from "@/components/info/carouselButton";
import { Carousel } from "@/components/ui/carousel";
import { useLanguageContext } from "@/contexts/languageContext";
import { createLazyFileRoute } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { t } = useLanguageContext();
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <MainContainer>
      <div>
        <Carousel
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          <h3 className="pb-2 font-mono text-lg font-medium leading-6 flex justify-between items-center mb-2">
            {t("top_rated")}
            <div>
              <CarouselButton direction="left" />
              <CarouselButton direction="right" />
            </div>
          </h3>
          <Banner />
        </Carousel>
      </div>

      <RowContainer title={t("new_releases")} dataToFetch="newReleases" />

      <RowContainer
        title={t("most_anticipated")}
        dataToFetch="mostAnticipated"
      />
    </MainContainer>
  );
}
