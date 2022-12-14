import { IPlayer } from './player';
import { IPlayerStats } from './player-stats';

export interface IPlayerGame extends IPlayerStats {
  id: string;
  player: IPlayer;
  playerScore: '0' | '15' | '30' | '40' | 'A' | 'W' | number;
  isServing: boolean;
  isTieBreakCurrentServer?: boolean;
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
  totalBreakPointsCount: number;
  playedBreakPointsCount: number;
  breakPointConversionsCount: number;
  totalServedPointsCount: number;

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
    this.totalBreakPointsCount = 0;
    this.playedBreakPointsCount = 0;
    this.breakPointConversionsCount = 0;
    this.totalServedPointsCount = 0;
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
  totalBreakPointsCount: number = 0;
  playedBreakPointsCount: number = 0;
  breakPointConversionsCount: number = 0;
  totalServedPointsCount: number;

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
    this.totalServedPointsCount = 0;
  }
}
