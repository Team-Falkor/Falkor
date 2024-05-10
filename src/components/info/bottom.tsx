import { InfoProps } from '@/@types';
import GameMedia from '@/components/info/media';
import SimilarGames from '@/components/info/similar';
import PcSpecs from '@/components/info/specs';
import { useOS } from '@/stores/settings';
import { InfoReturn } from '@/utils/api/igdb/types';
import { FC, useMemo } from 'react';

const InfoBottom: FC<InfoReturn & InfoProps> = (props) => {
  const { platform } = useOS();
  const { similar_games } = props;

  const findRequirements = useMemo(() => {
    if (!props.steam?.data) return;
    if (platform === 'unknown') return;

<<<<<<< HEAD
    const data = props.steam?.data;

    switch (platform) {
      case 'windows':
        return data.pc_requirements;
      case 'macos':
        if (!data.mac_requirements && data.pc_requirements) return data.pc_requirements;
        return data.mac_requirements;
      case 'linux':
        if (!data.linux_requirements && data.pc_requirements) return data.pc_requirements;
        return props.steam?.data.linux_requirements;
      default:
        return props.steam?.data.pc_requirements;
    }
  }, [platform]);

  console.log({ findRequirements });

=======
    // const data = props.steam?.data;

    return props.steam?.data.pc_requirements;
  }, [platform]);

>>>>>>> main
  return (
    <div className="flex flex-col gap-6 mt-5">
      <SimilarGames data={similar_games} />

      <GameMedia {...props} />

      <PcSpecs {...findRequirements} />
    </div>
  );
};

export default InfoBottom;
