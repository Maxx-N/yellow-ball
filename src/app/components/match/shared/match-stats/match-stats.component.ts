import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMatch } from 'src/app/models/match';
import { IPlayerStats } from 'src/app/models/player-stats';

import { MatchService } from 'src/app/services/match/match.service';

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.scss'],
})
export class MatchStatsComponent implements OnInit, OnDestroy {
  statsToDisplay: any[];
  private currentMatchSubscription: Subscription;

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.displayStats(this.matchService.getCurrentMatch());
    this.currentMatchSubscription =
      this.matchService.currentMatchSubject.subscribe((currentMatch) => {
        this.displayStats(currentMatch);
      });
  }

  ngOnDestroy(): void {
    this.currentMatchSubscription.unsubscribe();
  }

  displayStats(currentMach: IMatch): void {
    const initialStats: IPlayerStats[] = this.getPlayerStats(currentMach);
    this.statsToDisplay = [
      this.getAcesStatsPlayer(initialStats),
      this.getFirstServesStatsPlayer(initialStats),
      this.getDoubleFaultsStatsPlayer(initialStats),
    ];
  }

  private getAcesStatsPlayer(initialStats: IPlayerStats[]): {
    statName: string;
    statPlayers: { displayedData: string; percentageOfTotal: number }[];
  } {
    return {
      statName: 'Aces',
      statPlayers: initialStats.map((playerStat) => {
        const otherStatPlayer = this.getOtherStatPlayer(
          initialStats,
          playerStat
        );
        return {
          displayedData: playerStat.acesCount.toString(),
          percentageOfTotal: this.getPercentage(
            playerStat.acesCount,
            playerStat.acesCount + otherStatPlayer.acesCount
          ),
        };
      }),
    };
  }

  private getFirstServesStatsPlayer(initialStats: IPlayerStats[]): {
    statName: string;
    statPlayers: { displayedData: string; percentageOfTotal: number }[];
  } {
    return {
      statName: '1st Serve %',
      statPlayers: initialStats.map((playerStat) => {
        const otherStatPlayer = this.getOtherStatPlayer(
          initialStats,
          playerStat
        );

        return {
          displayedData: `${this.getPercentage(
            playerStat.firstServesCount,
            playerStat.totalServedPointsCount
          )}%`,
          percentageOfTotal: this.getPercentage(
            this.getPercentage(
              playerStat.firstServesCount,
              playerStat.totalServedPointsCount
            ),
            this.getPercentage(
              playerStat.firstServesCount,
              playerStat.totalServedPointsCount
            ) +
              this.getPercentage(
                otherStatPlayer.firstServesCount,
                otherStatPlayer.totalServedPointsCount
              )
          ),
        };
      }),
    };
  }

  private getDoubleFaultsStatsPlayer(initialStats: IPlayerStats[]): {
    statName: string;
    statPlayers: { displayedData: string; percentageOfTotal: number }[];
  } {
    return {
      statName: 'Double Faults',
      statPlayers: initialStats.map((playerStat) => {
        const otherStatPlayer = this.getOtherStatPlayer(
          initialStats,
          playerStat
        );
        return {
          displayedData: playerStat.doubleFaultsCount.toString(),
          percentageOfTotal: this.getPercentage(
            playerStat.doubleFaultsCount,
            playerStat.doubleFaultsCount + otherStatPlayer.doubleFaultsCount
          ),
        };
      }),
    };
  }

  private getOtherStatPlayer(
    initialStats: IPlayerStats[],
    statPlayer: any
  ): any {
    return initialStats.find((sp) => {
      return sp.player.id !== statPlayer.player.id;
    });
  }

  private getPlayerStats(currentMach: IMatch): IPlayerStats[] {
    return currentMach.players.map((player) => {
      return this.matchService.getPlayerStats(player);
    });
  }

  private getPercentage(value: number, total: number): number {
    if (total === 0) {
      return 100;
    }
    return Math.round((value / total) * 100);
  }
}
