import { IPlayer } from './player';
import { IPlayerGame, PlayerGame } from './player-game';
import { ISet } from './set';

export interface IGame {
  id: string;
  position: number;
  playerGames: IPlayerGame[];
  getSet(allSets: ISet[]): ISet;
  getWinner(): IPlayer;
  getPlayerScore(player: IPlayer): string;
  getServer(): IPlayer;
  addPointToPlayer(player: IPlayer): void;
}

export class Game implements IGame {
  id: string;
  position: number;
  playerGames: IPlayerGame[];

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
    this.playerGames = [];
    this.newPlayerGames({ players, server });
  }

  getSet(allSets: ISet[]): ISet {
    return allSets.find((set) => {
      return set.games.map((game) => game.id).includes(this.id);
    });
  }

  getWinner(): IPlayer {
    return this.playerGames.find((playerGame) => {
      return playerGame.playerScore === 'W';
    })?.player;
  }

  getPlayerScore(player: IPlayer): string {
    return this.playerGames.find((playerGame) => {
      return playerGame.player.id === player.id;
    }).playerScore;
  }

  getServer(): IPlayer {
    return this.playerGames.find((playerGame) => {
      return playerGame.isServing;
    })?.player;
  }

  addPointToPlayer(player: IPlayer): void {
    const winningPointPlayerGame: IPlayerGame = this.playerGames.find(
      (playerGame) => playerGame.player.id === player.id
    );
    const loserPointPlayerGame: IPlayerGame = this.playerGames.find(
      (playerGame) => playerGame.player.id !== player.id
    );

    switch (winningPointPlayerGame.playerScore) {
      case '0':
        winningPointPlayerGame.playerScore = '15';
        break;
      case '15':
        winningPointPlayerGame.playerScore = '30';
        break;
      case '30':
        winningPointPlayerGame.playerScore = '40';
        break;
      case '40':
        if (loserPointPlayerGame.playerScore === '40') {
          winningPointPlayerGame.playerScore = 'A';
        } else if (loserPointPlayerGame.playerScore === 'A') {
          loserPointPlayerGame.playerScore = '40';
        } else {
          winningPointPlayerGame.playerScore = 'W';
        }
        break;
      case 'A':
        winningPointPlayerGame.playerScore = 'W';
        break;
      default:
        return;
    }
  }

  private newPlayerGames({
    players,
    server,
  }: {
    players: IPlayer[];
    server: IPlayer;
  }): void {
    for (const player of players) {
      const playerGame: IPlayerGame = new PlayerGame({
        player,
        isServing: player.id === server.id,
      });
      this.playerGames.push(playerGame);
    }
  }
}
