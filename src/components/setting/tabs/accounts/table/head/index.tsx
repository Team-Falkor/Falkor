import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AccountsTableHead = () => {
  return (
    <TableHeader className="bg-slate-600/90 ">
      <TableRow className="*:text-white">
        <TableHead className="text-left">Username</TableHead>
        <TableHead className="w-[200px]">Status</TableHead>
        <TableHead className="w-[200px]">Expiry Date</TableHead>
        <TableHead className="w-[150px]">Service</TableHead>
        <TableHead className="w-[80px] text-center">Manage</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default AccountsTableHead;
