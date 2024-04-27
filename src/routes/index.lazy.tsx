import Banner from '@/components/banner';
import GenericRow from '@/components/genericRow';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="w-full p-5">
      <div>
        <h3 className="pb-2 font-mono text-lg font-medium leading-6">Top Rated</h3>
        <Banner />
      </div>

      <div className="px-3 mx-auto">
        <div className="flex items-center justify-between pt-20 pb-1">
          <h3 className="pb-2 font-mono text-lg font-medium leading-6">Most Anticipated</h3>
          <Button
            variant="link"
            className="p-0 m-0 text-sm text-slate-400"
          >
            View More
          </Button>
        </div>

        <Separator
          orientation="horizontal"
          className="mb-1.5 bg-primary/80"
        />

        <GenericRow dataToFetch="mostAnticipated" />
      </div>
    </div>
  );
}
