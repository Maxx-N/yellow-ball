import { IMatch } from './match';
import { IGame } from './game';

export interface ISet {
  id: string;
  matchId: string;
  position: 1 | 2 | 3 | 4 | 5;
  getMatch(allMatches: IMatch[]): IMatch;
  getGames(allGames: IGame[]): IGame[];
}

export class Set implements ISet {
  id: string;
  matchId: string;
  position: 1 | 2 | 3 | 4 | 5;

  constructor({
    match,
    position,
  }: {
    match: IMatch;
    position: 1 | 2 | 3 | 4 | 5;
  }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.matchId = match.id;
    this.position = position;
  }

  getMatch(allMatches: IMatch[]): IMatch {
    return allMatches.find((match) => match.id === this.matchId);
  }

  getGames(allGames: IGame[]): IGame[] {
    return allGames.filter((game) => game.setId === this.id);
  }
}
