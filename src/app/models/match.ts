import { IPlayer } from './player';
import { ISet } from './set';

export interface IMatch {
  id: string;
  players: IPlayer[];
  abandoner?: IPlayer;
  sets: ISet[];
  isFinalSetTiebreak: boolean;
  setsNumber: 3 | 5;
}

export class Match implements IMatch {
  id: string;
  players: IPlayer[];
  abandoner?: IPlayer;
  sets: ISet[];
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
    this.players = players;
    this.sets = [];
    this.isFinalSetTiebreak = isFinalSetTiebreak;
    this.setsNumber = setsNumber;
  }
}
