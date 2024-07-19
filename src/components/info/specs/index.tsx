import RequirementsRow from "@/components/info/specs/row";
import { useLanguageContext } from "@/contexts/languageContext";
import { PcRequirements } from "@/utils/api/igdb/types";
import { FC } from "react";

type PcSpecsProps = PcRequirements;

export type Data = {
  type: "minimum" | "recommended";
  data: string | undefined | null;
};

const PcSpecs: FC<PcSpecsProps> = ({ minimum, recommended }) => {
  const { t } = useLanguageContext();

  //combine minimum and recommended
  const data: Data[] | null = [
    { type: "minimum", data: minimum },
    { type: "recommended", data: recommended },
  ];

  // remove null values
  const items = data.filter((item) => item?.data);

  if (!items?.length) return null;

  return (
    <div className="grid gap-4">
      <h3 className="text-lg font-bold leading-6 text-primary">
        {t("system_requirements")}
      </h3>
      <div className="flex gap-4">
        {items.map((item) => (
          <RequirementsRow
            key={item?.type}
            type={item?.type}
            data={item?.data}
          />
        ))}
      </div>
    </div>
  );
};

export default PcSpecs;
