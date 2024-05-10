import GenericRow from '@/components/genericRow';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FunctionComponent } from 'react';

interface RowContainerProps {
  title: string;
  dataToFetch: 'mostAnticipated' | 'topRated' | 'newReleases';
}

const RowContainer: FunctionComponent<RowContainerProps> = ({ dataToFetch, title }) => {
  return (
    <div className="px-3 mx-auto">
      <div className="flex items-center justify-between pt-20 pb-1">
        <h3 className="pb-2 font-mono text-lg font-medium leading-6">{title}</h3>
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

      <GenericRow dataToFetch={dataToFetch} />
    </div>
  );
};

export default RowContainer;
