import { distance } from 'fastest-levenshtein';

interface ExtraData {
  genres?: string[];
  release_date?: string;
  platforms?: string[];
}
export type SearchingFor = 'title' | 'year' | 'format';

type Matches<T> = T & { distance_from: number };

export class Mapping<T extends { name: string }> {
  // Games
  game_title: string;
  array_to_search: T[];

  // Settings
  match_percentage: number = 80;
  distance: number = 1;

  // Extra data
  extra_data?: ExtraData;

  matches: Set<Matches<T>> = new Set();

  constructor(game_title: string, array_to_search: T[], extra_data?: ExtraData) {
    this.game_title = game_title;
    this.array_to_search = array_to_search;
    this.extra_data = extra_data;
  }

  async search(searching_for: SearchingFor = 'title') {
    switch (searching_for) {
      case 'title':
      default:
        for await (const item of this.array_to_search) {
          const title = item.name;
          const distance_from = distance(this.game_title, title);
          if (distance_from <= this.match_percentage) {
            this.matches.add({ ...item, distance_from });
          }
          continue;
        }
        break;
    }
  }

  async compare(_extra_data?: ExtraData) {
    // sort Matches set by distance
    const sorted_matches = Array.from(this.matches).sort((a, b) => a.distance_from - b.distance_from);
    return sorted_matches[0] ?? null;
  }
}
