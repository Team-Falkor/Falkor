import { InfoProps } from "@/@types";
import QuickInfoItem from "@/components/info/quickInfo/item";
import { useLanguageContext } from "@/contexts/languageContext";
import { timeSince } from "@/utils";
import { IGDBReturnDataType } from "@/utils/api/igdb/types";
import { FC, useMemo } from "react";

interface QuickInfoProps extends InfoProps {
  isReleased: boolean;
  data: IGDBReturnDataType | undefined;
}

const QuickInfo: FC<QuickInfoProps> = (props) => {
  const { t } = useLanguageContext();
  const { isReleased, data } = props;

  if (!data) return;

  const { genres, aggregated_rating, involved_companies, release_dates } = data;

  const publisher = useMemo(
    () => involved_companies.find((item) => item.publisher),
    []
  );
  const developer = useMemo(
    () => involved_companies.find((item) => item.developer),
    []
  );

  const releaseDate =
    release_dates?.find((item) => item.platform === 6) ?? release_dates[0];

  return (
    <section className="mt-3 overflow-hidden text-sm whitespace-normal text-ellipsis text-slate-400">
      <ul className="flex flex-col justify-center gap-2 -mt-1 border-gray-200 divide-gray-200 rounded-lg dark:divide-gray-700 dark:border-gray-700 dark:text-gray-100">
        <QuickInfoItem
          title={t("genres")}
          data={!!genres?.length ? genres : "N/A"}
        />
        <QuickInfoItem
          title={t("rating")}
          data={
            aggregated_rating
              ? `${aggregated_rating.toFixed(0)} / 100`
              : !isReleased
                ? "Not Released"
                : "N/A"
          }
        />
        <QuickInfoItem
          title={t("release_date")}
          data={`${releaseDate?.human} ${
            isReleased && releaseDate?.date
              ? `(${timeSince(releaseDate?.date * 1000)}) `
              : ""
          }`}
        />
        <QuickInfoItem
          title={`${t("developer")} / ${t("publisher")}`}
          data={
            `${developer?.company.name ?? "N/A"} / ${publisher?.company.name ?? "N/A"}` ??
            "N/A"
          }
        />
      </ul>
    </section>
  );
};

export default QuickInfo;
