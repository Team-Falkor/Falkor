export const searchEasterEggs: {
  name: string;
  query: string;
}[] = [
  {
    name: 'enimax',
    query: 'hollow knight',
  },
];

/**
 * https://api-docs.igdb.com/#game-enums
 * 0 = main game
 * 8 = remake
 * 9 = remaster
 * 10 = expanded game
 * 11 = port
 * 12 = fork
 */
export const allowedGameCategories: number[] = [0, 8, 9, 10, 11, 12];
