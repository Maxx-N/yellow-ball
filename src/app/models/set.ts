import { Game, IGame } from './game';
import { IMatch } from './match';
import { IPlayer } from './player';

export interface ISet {
  id: string;
  games: IGame[];
  getCurrentGame(): IGame;
  getPlayerScore(player: IPlayer): number;
  getWinner(): IPlayer;
  getCurrentServer(): IPlayer;
  newGame({
    players,
    server,
    isTieBreak,
  }: {
    players: IPlayer[];
    server: IPlayer;
    isTieBreak?: boolean;
  }): void;
  addPointToPlayer(player: IPlayer): void;
}

export class Set implements ISet {
  id: string;
  games: IGame[];

  constructor({
    players,
    server,
  }: {
    players: IPlayer[];
    server: IPlayer;
  }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.games = [];
    this.newGame({ players, server, isTieBreak: false });
  }

  getCurrentGame(): IGame {
    return this.games[this.games.length - 1];
  }

  getPlayerScore(player: IPlayer): number {
    let score: number = 0;
    for (const game of this.games) {
      if (game.getWinner()?.id === player.id) {
        score++;
      }
    }
    return score;
  }

  getWinner(): IPlayer {
    const players: IPlayer[] = this.getCurrentGame()?.playerGames.map(
      (playerGame) => {
        return playerGame.player;
      }
    );

    if (this.getCurrentGame().isTieBreak) {
      return this.getCurrentGame().getWinner();
    } else {
      const playerWith6PointsAtLeast: IPlayer = players.find(
        (player: IPlayer) => {
          return this.getPlayerScore(player) >= 6;
        }
      );

      if (!!playerWith6PointsAtLeast) {
        const otherPlayerTieBreak: IPlayer = players.find((player) => {
          return player.id !== playerWith6PointsAtLeast.id;
        });

        const scoreDifference: number =
          this.getPlayerScore(playerWith6PointsAtLeast) -
          this.getPlayerScore(otherPlayerTieBreak);

        if (scoreDifference < 2 && scoreDifference > -2) {
          return null;
        } else if (scoreDifference >= 2) {
          return playerWith6PointsAtLeast;
        } else {
          return otherPlayerTieBreak;
        }
      } else {
        return null;
      }
    }
  }

  getCurrentServer(): IPlayer {
    return this.getCurrentGame().getCurrentServer();
  }

  newGame({
    players,
    server,
    isTieBreak,
  }: {
    players: IPlayer[];
    server: IPlayer;
    isTieBreak: boolean;
  }): void {
    const newGame: IGame = new Game({
      players,
      server,
      isTieBreak,
    });
    this.games.push(newGame);
  }

  addPointToPlayer(player: IPlayer): void {
    this.getCurrentGame().addPointToPlayer(player);
  }
}
