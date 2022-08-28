import { IGame } from './game';
import { IPlayer } from './player';
import { ISet, Set } from './set';

export interface IMatch {
  id: string;
  players: IPlayer[];
  abandoner?: IPlayer;
  sets: ISet[];
  isFinalSetTiebreak: boolean;
  setsNumber: 3 | 5;
  getCurrentSet(): ISet;
  newSet(): void;
  newGame(): void;
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
    this.newSet();
  }

  getCurrentSet(): ISet {
    return this.sets[this.sets.length - 1];
  }

  getCurrentGame(): IGame {
    return this.getCurrentSet().getCurrentGame();
  }

  newSet(): void {
    const position = this.sets.length + 1;
    const newSet: ISet = new Set({ position, players: this.players });
    this.sets.push(newSet);
  }

  newGame(): void {
    this.getCurrentSet().newGame(this.players);
  }
}
