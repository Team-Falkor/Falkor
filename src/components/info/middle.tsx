import { infoHLTBProps, InfoProps } from "@/@types";
import { useLanguageContext } from "@/contexts/languageContext";
import { IGDBReturnDataType } from "@/utils/api/igdb/types";
import { FC } from "react";
import HLTBComponent from "../hltb";

const InfoMiddle: FC<IGDBReturnDataType & InfoProps & infoHLTBProps> = ({
  storyline,
  summary,
  hltbData,
  hltbError,
  hltbPending,
}) => {
  const { t } = useLanguageContext();

  return (
    <div>
      <section className="mt-6">
        {!!hltbData && !hltbError && !hltbPending && (
          <div className="w-full mb-5">
            <HLTBComponent
              times={[
                Math.floor(hltbData.comp_main / 60 / 60),
                Math.floor(hltbData.comp_plus / 60 / 60),
                Math.floor(hltbData.comp_100 / 60 / 60),
              ]}
            />
          </div>
        )}

        <h1 className="text-xl font-medium">{t("about_this_game")}</h1>
        <p className="pt-2 text-sm text-slate-400">
          {storyline ?? summary ?? "??"}
        </p>
      </section>
    </div>
  );
};

export default InfoMiddle;
