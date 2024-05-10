import { PlayIcon } from 'lucide-react';
import { FunctionComponent } from 'react';

interface RectangleCardProps {}

const RectangleCard: FunctionComponent<RectangleCardProps> = ({}) => {
  return (
    <div className="w-full h-[150px] rounded-t-lg p-0 overflow-hidden relative group">
      {/* BG */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidde">
        <img
          className="object-cover w-full h-full"
          src="https://images.igdb.com/igdb/image/upload/t_original/qseegzssgetrybgbplrv.png"
          alt="Rectangle Card"
        />
        <div className="absolute inset-0 z-0 w-full h-full bg-gradient-to-tr from-background to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col justify-end w-full h-full p-3">
        <h1 className="text-lg text-white">God of war</h1>
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 z-20 flex items-center justify-center w-full h-full transition-opacity opacity-0 cursor-pointer group-hover:opacity-100">
        <PlayIcon
          fill="white"
          className="size-10"
        />
      </div>
    </div>
  );
};

export default RectangleCard;
