import { IPlayer } from './player';
import { IPlayerGame } from './player-game';
import { ISet } from './set';

export interface IGame {
  id: string;
  position: number;
  playerGames: IPlayerGame[];
  getSet(allSets: ISet[]): ISet;
  addPointToPlayer(player: IPlayer): void;
}

export class Game implements IGame {
  id: string;
  position: number;
  playerGames: IPlayerGame[];

  constructor({ position }: { position: number }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.position = position;
    this.playerGames = [];
  }

  getSet(allSets: ISet[]): ISet {
    return allSets.find((set) => {
      return set.games.map((game) => game.id).includes(this.id);
    });
  }

  addPointToPlayer(player: IPlayer): void {
    const winningPointPlayerGame: IPlayerGame = this.playerGames.find(
      (playerGame) => playerGame.playerId === player.id
    );
    const loserPointPlayerGame: IPlayerGame = this.playerGames.find(
      (playerGame) => playerGame.playerId !== player.id
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
}