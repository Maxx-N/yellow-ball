import { IPlayer } from './player';
import { IPlayerGame } from './player-game';
import { ISet } from './set';

export interface IGame {
  id: string;
  setId: string;
  position: number;
  getSet(allSets: ISet[]): ISet;
  getPlayerGames(allPlayerGames: IPlayerGame[]): IPlayerGame[];
  addPointToPlayer({
    allPlayerGames,
    player,
  }: {
    allPlayerGames: IPlayerGame[];
    player: IPlayer;
  }): void;
}

export class Game implements IGame {
  id: string;
  setId: string;
  position: number;

  constructor({ set, position }: { set: ISet; position: number }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.setId = set.id;
    this.position = position;
  }

  getSet(allSets: ISet[]): ISet {
    return allSets.find((set) => set.id === this.setId);
  }

  getPlayerGames(allPlayerGames: IPlayerGame[]): IPlayerGame[] {
    return allPlayerGames.filter((playerGame) => playerGame.gameId === this.id);
  }

  addPointToPlayer({
    allPlayerGames,
    player,
  }: {
    allPlayerGames: IPlayerGame[];
    player: IPlayer;
  }): void {
    const playerGames = this.getPlayerGames(allPlayerGames);

    const winningPointPlayerGame: IPlayerGame = playerGames.find(
      (playerGame) => playerGame.playerId === player.id
    );
    const loserPointPlayerGame: IPlayerGame = playerGames.find(
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
