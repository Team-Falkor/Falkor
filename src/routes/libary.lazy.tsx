import List from '@/components/libary/List';
import ContuinePlaying from '@/components/libary/continue';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/libary')({
  component: Libary,
});

function Libary() {
  return (
    <div className="relative w-full h-full p-6 overflow-x-hidden max-w-[1350px] lg:max-w-[1700px] ml-auto mr-auto">
      <div className="flex flex-col w-full h-full gap-10">
        <ContuinePlaying />

        <div className="flex flex-col gap-5">
          <List
            name="Still need to play"
            id="still-need-to-play"
            items={[]}
          />

          <List
            name="Finished"
            id="still-need-to-play"
            items={[]}
          />
        </div>
      </div>
    </div>
  );
}
