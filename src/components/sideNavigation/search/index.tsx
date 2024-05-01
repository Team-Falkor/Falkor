import SearchCard from '@/components/cards/searchCard';
import { Input } from '@/components/ui/input';
import { PopoverContent } from '@/components/ui/popover';
import useDebounce from '@/hooks/useDebounce';
import { igdb } from '@/utils';
import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { ShipWheel } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

const Search: FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [data, setData] = useState<IGDBReturnDataType[] | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetcher = async (query: string) => {
    if (!searchTerm || searchTerm.length <= 2) return;

    setLoading(true);

    const data = await igdb.search(query);

    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetcher(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <PopoverContent
      side="right"
      className="p-0 w-80"
    >
      <div className="grid gap-4">
        <div className="w-full px-4 pt-4">
          <Input
            placeholder="What game are you looking for?"
            className="w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>

        <div className="grid w-full -mt-2">
          {!!loading && (
            <div className="flex items-center justify-center px-4 text-center py-14 sm:px-14">
              <ShipWheel className="mr-2 h-9 w-9 animate-spin stroke-primary text-primary" />
            </div>
          )}
          {!loading &&
            !!data?.length &&
            data.map((game) => (
              <SearchCard
                {...game}
                key={game.id}
                setOpen={setOpen}
              />
            ))}
        </div>
      </div>
    </PopoverContent>
  );
};

export default Search;
