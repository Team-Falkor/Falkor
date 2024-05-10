import AccountsTableBody from '@/components/setting/tabs/accounts/table/body';
import AccountsTableHead from '@/components/setting/tabs/accounts/table/head';
import { Table } from '@/components/ui/table';
import { FC } from 'react';

const AccountsTable: FC = () => {
  return (
    <Table>
      <AccountsTableHead />

      <AccountsTableBody />
    </Table>
  );
};

export default AccountsTable;
