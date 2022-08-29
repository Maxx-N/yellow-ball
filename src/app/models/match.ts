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
  getCurrentGame(): IGame;
  getPlayerScore(player: IPlayer): number;
  getWinner(): IPlayer;
  newSet(): void;
  newGame(): void;
  addPointToPlayer(player: IPlayer): void;
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

  getPlayerScore(player: IPlayer): number {
    let score: number = 0;
    for (const set of this.sets) {
      if (set.getWinner().id === player.id) {
        score++;
      }
    }
    return score;
  }

  getWinner(): IPlayer {
    const winningSets: number = this.setsNumber === 5 ? 3 : 2;
    return this.players.find((player) => {
      return this.getPlayerScore(player) >= winningSets;
    });
  }

  newSet(): void {
    const position = this.sets.length + 1;
    const newSet: ISet = new Set({ position, players: this.players });
    this.sets.push(newSet);
  }

  newGame(): void {
    this.getCurrentSet().newGame(this.players);
  }

  addPointToPlayer(player: IPlayer): void {
    this.getCurrentSet().addPointToPlayer(player);
  }
}
