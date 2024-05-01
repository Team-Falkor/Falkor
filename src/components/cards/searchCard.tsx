import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { Link } from '@tanstack/react-router';
import { FC } from 'react';

const SearchCard: FC<
  IGDBReturnDataType & {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = ({ name, id, setOpen }) => {
  return (
    <Link
      className="w-full px-6 py-2 border-b rounded-md cursor-default select-none hover:cursor-pointer hover:text-white"
      key={1}
      to={'/info/$id'}
      params={{ id: id.toString() }}
      onClick={() => setOpen(false)}
    >
      <p className="text-sm line-clamp-2">{name}</p>
    </Link>
  );
};

export default SearchCard;
