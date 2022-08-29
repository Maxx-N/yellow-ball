import { IGame } from './game';
import { IPlayer } from './player';

export interface IPlayerGame {
  id: string;
  player: IPlayer;
  playerScore: '0' | '15' | '30' | '40' | 'A' | 'W' | number;
  isServing: boolean;
  isTieBreakCurrentServer?: boolean;
  acesCount: number;
  firstServesCount: number;
  doubleFaultsCount: number;
  wonFirstServesCount: number;
  wonSecondServesCount: number;
  wonPointsCount: number;
  wonReceivingPointsCount: number;
  winnerPointsCount: number;
  forcedErrorsCount: number;
  unforcedErrorsCount: number;
  breakPointsCount?: number;
  breakPointConversionsCount?: number;
  getGame(allGames: IGame[]): IGame;
}

export class PlayerGame implements IPlayerGame {
  id: string;
  player: IPlayer;
  playerScore: '0' | '15' | '30' | '40' | 'A' | 'W';
  isServing: boolean;
  acesCount: number;
  firstServesCount: number;
  doubleFaultsCount: number;
  wonFirstServesCount: number;
  wonSecondServesCount: number;
  wonPointsCount: number;
  wonReceivingPointsCount: number;
  winnerPointsCount: number;
  forcedErrorsCount: number;
  unforcedErrorsCount: number;
  breakPointsCount: number;
  breakPointConversionsCount: number;

  constructor({ player, isServing }: { player: IPlayer; isServing?: boolean }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.player = player;

    this.isServing = isServing;
    this.playerScore = '0';
    this.acesCount = 0;
    this.firstServesCount = 0;
    this.doubleFaultsCount = 0;
    this.wonFirstServesCount = 0;
    this.wonSecondServesCount = 0;
    this.wonPointsCount = 0;
    this.wonReceivingPointsCount = 0;
    this.winnerPointsCount = 0;
    this.forcedErrorsCount = 0;
    this.unforcedErrorsCount = 0;
    this.breakPointsCount = 0;
    this.breakPointConversionsCount = 0;
  }

  getGame(allGames: IGame[]): IGame {
    return allGames.find((game) => {
      return game.playerGames
        .map((playerGame) => playerGame.id)
        .includes(this.id);
    });
  }
}

export class PlayerTieBreak implements IPlayerGame {
  id: string;
  player: IPlayer;
  playerScore: number;
  isServing: boolean;
  isTieBreakCurrentServer: boolean;
  acesCount: number;
  firstServesCount: number;
  doubleFaultsCount: number;
  wonFirstServesCount: number;
  wonSecondServesCount: number;
  wonPointsCount: number;
  wonReceivingPointsCount: number;
  winnerPointsCount: number;
  forcedErrorsCount: number;
  unforcedErrorsCount: number;

  constructor({ player, isServing }: { player: IPlayer; isServing?: boolean }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.player = player;

    this.isServing = isServing;
    this.isTieBreakCurrentServer = isServing;
    this.playerScore = 0;
    this.acesCount = 0;
    this.firstServesCount = 0;
    this.doubleFaultsCount = 0;
    this.wonFirstServesCount = 0;
    this.wonSecondServesCount = 0;
    this.wonPointsCount = 0;
    this.wonReceivingPointsCount = 0;
    this.winnerPointsCount = 0;
    this.forcedErrorsCount = 0;
    this.unforcedErrorsCount = 0;
  }

  getGame(allGames: IGame[]): IGame {
    return allGames.find((game) => {
      return game.playerGames
        .map((playerGame) => playerGame.id)
        .includes(this.id);
    });
  }
}
