import { IMatch } from './match';
import { Game, IGame } from './game';
import { IPlayer } from './player';
import { PlayerGame } from './player-game';

export interface ISet {
  id: string;
  position: number;
  games: IGame[];
  getMatch(allMatches: IMatch[]): IMatch;
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
  position: number;
  games: IGame[];

  constructor({
    position,
    players,
    server,
  }: {
    position: number;
    players: IPlayer[];
    server: IPlayer;
  }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.position = position;
    this.games = [];
    this.newGame({ players, server });
  }

  getMatch(allMatches: IMatch[]): IMatch {
    return allMatches.find((match) => {
      return match.sets.map((set) => set.id).includes(this.id);
    });
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

    if (players.some((player) => this.getPlayerScore(player) >= 6)) {
      if (players.some((player) => this.getPlayerScore(player) <= 4)) {
        return players.find((player) => this.getPlayerScore(player) >= 6);
      } else {
        return players.find((player) => this.getPlayerScore(player) >= 7);
      }
    } else {
      return null;
    }
  }

  getCurrentServer(): IPlayer {
    return this.getCurrentGame().getCurrentServer();
  }

  newGame({ players, server }: { players: IPlayer[]; server: IPlayer }): void {
    const playerScores: number[] = this.getCurrentGame()
      ?.playerGames.map((playerGame) => {
        return playerGame.player;
      })
      .map((player) => {
        return this.getPlayerScore(player);
      });
    let isTieBreak =
      !!playerScores && playerScores[0] === 6 && playerScores[1] === 6;

    const position = this.games.length + 1;
    const newGame: IGame = new Game({
      position,
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
