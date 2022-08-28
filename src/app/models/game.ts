import { IPlayerGame } from './player-game';
import { ISet } from './set';

export interface IGame {
  id: string;
  setId: string;
  position: number;
  getSet(allSets: ISet[]): ISet;
  getPlayerGames(allPlayerGames: IPlayerGame[]): IPlayerGame[];
}

export class Game implements IGame {
  id: string;
  setId: string;
  position: number;

  constructor({ set, position }: { set: ISet; position: number }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.setId = set.id;
    this.position = position;
  }

  getSet(allSets: ISet[]): ISet {
    return allSets.find((set) => set.id === this.setId);
  }

  getPlayerGames(allPlayerGames: IPlayerGame[]): IPlayerGame[] {
    return allPlayerGames.filter((playerGame) => playerGame.gameId === this.id);
  }
}
