import { InfoProps } from '@/@types';
import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { FC } from 'react';

const InfoMiddle: FC<IGDBReturnDataType & InfoProps> = ({ storyline, summary }) => {
  return (
    <div>
      <section className="mt-10">
        <h1 className="text-xl font-medium">About The Game</h1>
        <p className="pt-2 text-sm text-slate-400">{storyline ?? summary ?? '??'}</p>
      </section>
    </div>
  );
};

export default InfoMiddle;
