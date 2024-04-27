import { InfoProps } from '@/@types';
import GameMedia from '@/components/info/media';
import SimilarGames from '@/components/info/similar';
import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { FC } from 'react';

const InfoBottom: FC<IGDBReturnDataType & InfoProps> = (props) => {
  const { similar_games } = props;

  return (
    <div className="flex flex-col gap-6 mt-5">
      <SimilarGames data={similar_games} />

      <GameMedia {...props} />
    </div>
  );
};

export default InfoBottom;
