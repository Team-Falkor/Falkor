import Banner from '@/components/banner';
import RowContainer from '@/containers/row';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="w-full p-5 overflow-x-hidden">
      <div>
        <h3 className="pb-2 font-mono text-lg font-medium leading-6">Top Rated</h3>
        <Banner />
      </div>

      <RowContainer
        title="New Releases"
        dataToFetch="newReleases"
      />

      <RowContainer
        title="Most Anticipated"
        dataToFetch="mostAnticipated"
      />
    </div>
  );
}
