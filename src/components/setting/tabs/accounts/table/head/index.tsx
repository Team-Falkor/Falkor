import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguageContext } from "@/contexts/languageContext";

const AccountsTableHead = () => {
  const { t } = useLanguageContext();

  return (
    <TableHeader className="bg-slate-600/90 ">
      <TableRow className="*:text-white">
        <TableHead className="text-left">{t("username")}</TableHead>
        <TableHead className="w-[200px]">{t("status")}</TableHead>
        <TableHead className="w-[200px]">{t("expiry_date")}</TableHead>
        <TableHead className="w-[150px]">{t("service")}</TableHead>
        <TableHead className="w-[80px] text-center">{t("manage")}</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default AccountsTableHead;
