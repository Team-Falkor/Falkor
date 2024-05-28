import List from '@/components/libary/List';
import ContuinePlaying from '@/components/libary/continue';
import MainContainer from '@/containers/mainContainer';
import useCollection from '@/hooks/useCollection';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/libary')({
  component: Libary,
});

function Libary() {
  const { getCollectionNames } = useCollection();

  const { data, isError, isPending, error } = useQuery({
    queryKey: ['collectionNames'],
    queryFn: getCollectionNames,
  });

  return (
    <MainContainer>
      <div className="flex flex-col w-full h-full gap-10">
        <ContuinePlaying />

        <div className="flex flex-col gap-5">
          {!data && isPending && <p>loading...</p>}
          {isError && <p>{error.message}</p>}
          {!!data ? (
            data.map((item) => (
              <List
                key={item}
                name={item}
                id={item}
              />
            ))
          ) : (
            <div className="flex items-center w-full">
              <h1 className="w-full text-2xl font-bold text-center">Seems like there's nothing here</h1>
            </div>
          )}
        </div>
      </div>
    </MainContainer>
  );
}
