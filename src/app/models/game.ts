import { IPlayer } from './player';
import { IPlayerGame, PlayerGame, PlayerTieBreak } from './player-game';

export interface IGame {
  id: string;
  isTieBreak: boolean;
  playerGames: IPlayerGame[];
  getWinner(): IPlayer;
  getPlayerScore(player: IPlayer): string | number;
  getCurrentServer(): IPlayer;
  addPointToPlayer(player: IPlayer): void;
}

export class Game implements IGame {
  id: string;
  isTieBreak: boolean;
  playerGames: IPlayerGame[];

  constructor({
    players,
    server,
    isTieBreak,
  }: {
    players: IPlayer[];
    server: IPlayer;
    isTieBreak?: boolean;
  }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.playerGames = [];
    this.isTieBreak = isTieBreak;

    this.newPlayerGames({ players, server });
  }

  getWinner(): IPlayer {
    if (this.isTieBreak) {
      return this.getWinnerIfTieBreak();
    } else {
      return this.playerGames.find((playerGame) => {
        return playerGame.playerScore === 'W';
      })?.player;
    }
  }

  getPlayerScore(player: IPlayer): string | number {
    return this.playerGames.find((playerGame) => {
      return playerGame.player.id === player.id;
    }).playerScore;
  }

  getCurrentServer(): IPlayer {
    if (this.isTieBreak) {
      return this.playerGames.find((playerGame) => {
        return playerGame.isTieBreakCurrentServer;
      })?.player;
    } else {
      return this.playerGames.find((playerGame) => {
        return playerGame.isServing;
      })?.player;
    }
  }

  addPointToPlayer(player: IPlayer): void {
    if (this.isTieBreak) {
      this.addPointToPlayerIfTieBreak(player);
    } else {
      this.addPointToPlayerIfRegularGame(player);
    }
  }

  private addPointToPlayerIfRegularGame(player: IPlayer): void {
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

  private addPointToPlayerIfTieBreak(player: IPlayer) {
    const winningPointPlayerGame: IPlayerGame = this.playerGames.find(
      (playerGame) => playerGame.player.id === player.id
    );

    (winningPointPlayerGame.playerScore as number)++;

    const sumOfPoints: number = this.playerGames
      .map((playerTieBreak: PlayerTieBreak) => playerTieBreak.playerScore)
      .reduce((initialValue, currentValue) => initialValue + currentValue,);

    if (sumOfPoints % 2 !== 0) {
      for (const playerGame of this.playerGames) {
        playerGame.isTieBreakCurrentServer =
          !playerGame.isTieBreakCurrentServer;
      }
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
      const playerGame: IPlayerGame = this.isTieBreak
        ? new PlayerTieBreak({ player, isServing: player.id === server.id })
        : new PlayerGame({
            player,
            isServing: player.id === server.id,
          });
      this.playerGames.push(playerGame);
    }
  }

  private getWinnerIfTieBreak(): IPlayer {
    const playerTieBreakWith7PointsAtLeast: PlayerTieBreak = (
      this.playerGames as PlayerTieBreak[]
    ).find((playerGame: PlayerTieBreak) => {
      return playerGame.playerScore >= 7;
    });

    if (!!playerTieBreakWith7PointsAtLeast) {
      const otherPlayerTieBreak: PlayerTieBreak = (
        this.playerGames as PlayerTieBreak[]
      ).find((playerTieBreak) => {
        return playerTieBreak.id !== playerTieBreakWith7PointsAtLeast.id;
      });

      const scoreDifference: number =
        playerTieBreakWith7PointsAtLeast.playerScore -
        otherPlayerTieBreak.playerScore;

      if (scoreDifference < 2 && scoreDifference > -2) {
        return null;
      } else if (scoreDifference >= 2) {
        return playerTieBreakWith7PointsAtLeast.player;
      } else {
        return otherPlayerTieBreak.player;
      }
    } else {
      return null;
    }
  }
}
