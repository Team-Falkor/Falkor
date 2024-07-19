import MediaScreenshots from "@/components/info/media/screenshots";
import MediaTrailer from "@/components/info/media/trailer";
import { useLanguageContext } from "@/contexts/languageContext";
import { IGDBReturnDataType } from "@/utils/api/igdb/types";
import { FC } from "react";

const GameMedia: FC<IGDBReturnDataType> = (props) => {
  const { t } = useLanguageContext();
  const { name, screenshots, videos } = props;

  return (
    <div>
      <h1 className="pb-4 text-xl font-medium">{t("media")}</h1>

      <MediaTrailer videos={videos} />

      <MediaScreenshots screenshots={screenshots} name={name} />
    </div>
  );
};

export default GameMedia;
