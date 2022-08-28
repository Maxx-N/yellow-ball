import { IPlayer } from './player';
import { ISet } from './set';

export interface IMatch {
  id: string;
  playerIds: string[];
  abandonerId?: string;
  isFinalSetTiebreak: boolean;
  setsNumber: 3 | 5;
  getSets(allSets: ISet[]): ISet[];
  getPlayers(allPlayers: IPlayer[]): IPlayer[];
}

export class Match implements IMatch {
  id: string;
  playerIds: string[];
  abandonerId?: string;
  isFinalSetTiebreak: boolean;
  setsNumber: 3 | 5;

  constructor({
    players,
    isFinalSetTiebreak,
    setsNumber,
  }: {
    players: IPlayer[];
    isFinalSetTiebreak: boolean;
    setsNumber: 3 | 5;
  }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.playerIds = players.map((player) => player.id);
    this.isFinalSetTiebreak = isFinalSetTiebreak;
    this.setsNumber = setsNumber;
  }

  getPlayers(allPlayers: IPlayer[]): IPlayer[] {
    return allPlayers.filter((player) => this.playerIds.includes(player.id));
  }

  getSets(allSets: ISet[]): ISet[] {
    return allSets.filter((set) => set.matchId === this.id);
  }
}
