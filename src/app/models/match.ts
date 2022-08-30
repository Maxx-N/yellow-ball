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
  getCurrentServer(): IPlayer;
  newSet(server: IPlayer): void;
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
    server,
    isFinalSetTiebreak,
    setsNumber,
  }: {
    players: IPlayer[];
    server: IPlayer;
    isFinalSetTiebreak: boolean;
    setsNumber: 3 | 5;
  }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.players = players;
    this.sets = [];
    this.isFinalSetTiebreak = isFinalSetTiebreak;
    this.setsNumber = setsNumber;
    if (!!server) {
      this.newSet(server);
    }
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
      if (set.getWinner()?.id === player.id) {
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

  getCurrentServer(): IPlayer {
    return this.getCurrentSet().getCurrentServer();
  }

  newSet(server: IPlayer): void {
    const newSet: ISet = new Set({ players: this.players, server });
    this.sets.push(newSet);
  }

  newGame(): void {
    let isTieBreak = false;

    const playerScoresInTheCurrentSet: number[] = this.players.map((player) => {
      return this.getCurrentSet().getPlayerScore(player);
    });

    const is6All =
      !!playerScoresInTheCurrentSet &&
      playerScoresInTheCurrentSet[0] === 6 &&
      playerScoresInTheCurrentSet[1] === 6;

    if (is6All) {
      const isFinalSet: boolean = this.sets.length === this.setsNumber;
      if (!isFinalSet || this.isFinalSetTiebreak) {
        isTieBreak = true;
      }
    }

    this.getCurrentSet().newGame({
      players: this.players,
      server: this.getNextServer(),
      isTieBreak,
    });
  }

  addPointToPlayer(player: IPlayer): void {
    if (!this.getWinner()) {
      this.getCurrentSet().addPointToPlayer(player);
      if (!this.getWinner()) {
        if (!!this.getCurrentSet().getWinner()) {
          this.newSet(this.getNextServer());
        } else if (!!this.getCurrentGame().getWinner()) {
          this.newGame();
        }
      }
    }
  }

  private getNextServer(): IPlayer {
    return this.getCurrentGame().playerGames.find((playerGame) => {
      return !playerGame.isServing;
    }).player;
  }
}
