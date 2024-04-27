import DefaultCard from '@/components/cards/defaultCard';
import GenericRowSkeleton from '@/components/skeletons/genericRow';
import { igdb } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

interface GenericRowProps {
  dataToFetch: 'mostAnticipated' | 'topRated';
}

const GenericRow: FC<GenericRowProps> = ({ dataToFetch }) => {
  const fetcher = async () => {
    const data = await igdb[dataToFetch]();
    return data;
  };

  const { data, isPending, error } = useQuery({
    queryKey: ['igdb', dataToFetch],
    queryFn: fetcher,
  });

  if (isPending) return <GenericRowSkeleton />;
  if (error) return null;

  return (
    <section className="flex justify-between gap-2">
      {data?.slice(0, 6).map((game) => (
        <DefaultCard
          name={game.name}
          cover={game.cover}
          screenshots={game.screenshots}
          id={game.id.toString()}
          genres={game.genres}
          key={game.id}
        />
      ))}
    </section>
  );
};

export default GenericRow;
