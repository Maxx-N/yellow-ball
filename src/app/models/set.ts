import { IMatch } from './match';
import { IGame } from './game';

export interface ISet {
  id: string;
  position: number;
  games: IGame[];
  getMatch(allMatches: IMatch[]): IMatch;
}

export class Set implements ISet {
  id: string;
  position: number;
  games: IGame[];

  constructor({ position }: { position: number }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.position = position;
    this.games = [];
  }

  getMatch(allMatches: IMatch[]): IMatch {
    return allMatches.find((match) => {
      return match.sets.map((set) => set.id).includes(this.id);
    });
  }
}
