import { IPlayer } from "./player";

export interface IPlayerStats {
  player: IPlayer;
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
}
