import { MatchStatsEnum } from 'src/app/models/enum/match-stats.enum';

export interface IMatchStat {
  statName: MatchStatsEnum;
  statPlayers: { displayedData: string; percentageOfTotal: number }[];
}
