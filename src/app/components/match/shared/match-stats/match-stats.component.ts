import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IMatch } from 'src/app/models/match';
import { IPlayer } from 'src/app/models/player';
import { IPlayerStats } from 'src/app/models/player-stats';
import { MatchService } from 'src/app/services/match/match.service';

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.scss'],
})
export class MatchStatsComponent implements OnInit, OnDestroy {
  statsToDisplay: any[];
  players: IPlayer[];
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
    this.players = currentMach.players;
    const allPlayerStats: IPlayerStats[] = this.getPlayerStats(currentMach);
    this.statsToDisplay = [
      this.getAcesStatsPlayer(allPlayerStats),
      this.getFirstServesStatsPlayer(allPlayerStats),
      this.getDoubleFaultsStatsPlayer(allPlayerStats),
      this.getWinOnFirstServesStatsPlayer(allPlayerStats),
      this.getWinOnSecondServesStatsPlayer(allPlayerStats),
      this.getPointsWonStatsPlayer(allPlayerStats),
      this.getReceivingPointsWonStatsPlayer(allPlayerStats),
      this.getWinnersStatsPlayer(allPlayerStats),
    ];
  }

  private getPlayerStats(currentMach: IMatch): IPlayerStats[] {
    return currentMach.players.map((player) => {
      return this.matchService.getPlayerStats(player);
    });
  }

  // HELPERS

  private getAcesStatsPlayer(initialStats: IPlayerStats[]): {
    statName: string;
    statPlayers: { displayedData: string; percentageOfTotal: number }[];
  } {
    return {
      statName: 'Aces',
      statPlayers: initialStats.map((playerStat) => {
        const otherStatPlayer = this.getOtherPlayerStat(
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
        const otherStatPlayer = this.getOtherPlayerStat(
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
        const otherStatPlayer = this.getOtherPlayerStat(
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

  private getWinOnFirstServesStatsPlayer(initialStats: IPlayerStats[]): {
    statName: string;
    statPlayers: { displayedData: string; percentageOfTotal: number }[];
  } {
    return {
      statName: 'Win % on 1st Serve %',
      statPlayers: initialStats.map((playerStat) => {
        const otherStatPlayer = this.getOtherPlayerStat(
          initialStats,
          playerStat
        );

        return {
          displayedData: `${this.getPercentage(
            playerStat.wonFirstServesCount,
            playerStat.firstServesCount
          )}%`,
          percentageOfTotal: this.getPercentage(
            this.getPercentage(
              playerStat.wonFirstServesCount,
              playerStat.firstServesCount
            ),
            this.getPercentage(
              playerStat.wonFirstServesCount,
              playerStat.firstServesCount
            ) +
              this.getPercentage(
                otherStatPlayer.wonFirstServesCount,
                otherStatPlayer.firstServesCount
              )
          ),
        };
      }),
    };
  }

  private getWinOnSecondServesStatsPlayer(initialStats: IPlayerStats[]): {
    statName: string;
    statPlayers: { displayedData: string; percentageOfTotal: number }[];
  } {
    return {
      statName: 'Win % on 2nd Serve %',
      statPlayers: initialStats.map((playerStat) => {
        const otherStatPlayer = this.getOtherPlayerStat(
          initialStats,
          playerStat
        );
        const secondServesCount: number = this.getSecondServesCount(playerStat);

        return {
          displayedData: `${this.getPercentage(
            playerStat.wonSecondServesCount,
            secondServesCount
          )}%`,
          percentageOfTotal: this.getPercentage(
            this.getPercentage(
              playerStat.wonSecondServesCount,
              secondServesCount
            ),
            this.getPercentage(
              playerStat.wonSecondServesCount,
              secondServesCount
            ) +
              this.getPercentage(
                otherStatPlayer.wonSecondServesCount,
                this.getSecondServesCount(otherStatPlayer)
              )
          ),
        };
      }),
    };
  }

  private getPointsWonStatsPlayer(initialStats: IPlayerStats[]): {
    statName: string;
    statPlayers: { displayedData: string; percentageOfTotal: number }[];
  } {
    return {
      statName: 'Points Won',
      statPlayers: initialStats.map((playerStat) => {
        const otherStatPlayer = this.getOtherPlayerStat(
          initialStats,
          playerStat
        );
        return {
          displayedData: playerStat.wonPointsCount.toString(),
          percentageOfTotal: this.getPercentage(
            playerStat.wonPointsCount,
            playerStat.wonPointsCount + otherStatPlayer.wonPointsCount
          ),
        };
      }),
    };
  }

  private getReceivingPointsWonStatsPlayer(allPlayerStats: IPlayerStats[]): {
    statName: string;
    statPlayers: { displayedData: string; percentageOfTotal: number }[];
  } {
    return {
      statName: 'Receiving Points Won %',
      statPlayers: allPlayerStats.map((playerStat) => {
        const otherPlayerStat = this.getOtherPlayerStat(
          allPlayerStats,
          playerStat
        );
        const receivedPointsCount: number = this.getReceivedPointsCount(
          allPlayerStats,
          playerStat
        );

        return {
          displayedData: `${this.getPercentage(
            playerStat.wonReceivingPointsCount,
            receivedPointsCount
          )}%`,
          percentageOfTotal: this.getPercentage(
            this.getPercentage(
              playerStat.wonReceivingPointsCount,
              receivedPointsCount
            ),
            this.getPercentage(
              playerStat.wonReceivingPointsCount,
              receivedPointsCount
            ) +
              this.getPercentage(
                otherPlayerStat.wonReceivingPointsCount,
                this.getReceivedPointsCount(allPlayerStats, otherPlayerStat)
              )
          ),
        };
      }),
    };
  }

  private getWinnersStatsPlayer(initialStats: IPlayerStats[]): {
    statName: string;
    statPlayers: { displayedData: string; percentageOfTotal: number }[];
  } {
    return {
      statName: 'Winners',
      statPlayers: initialStats.map((playerStat) => {
        const otherStatPlayer = this.getOtherPlayerStat(
          initialStats,
          playerStat
        );
        return {
          displayedData: playerStat.winnerPointsCount.toString(),
          percentageOfTotal: this.getPercentage(
            playerStat.winnerPointsCount,
            playerStat.winnerPointsCount + otherStatPlayer.winnerPointsCount
          ),
        };
      }),
    };
  }

  //

  private getOtherPlayerStat(
    allPlayerStats: IPlayerStats[],
    playerStat: IPlayerStats
  ): IPlayerStats {
    return allPlayerStats.find((ps) => {
      return ps.player.id !== playerStat.player.id;
    });
  }

  private getPercentage(value: number, total: number): number {
    if (total === 0) {
      return 0;
    }
    return Math.round((value / total) * 100);
  }

  private getSecondServesCount(playerStats: IPlayerStats): number {
    return (
      playerStats.totalServedPointsCount -
      playerStats.firstServesCount -
      playerStats.doubleFaultsCount
    );
  }

  private getReceivedPointsCount(
    allPlayerStats: IPlayerStats[],
    playerStat: IPlayerStats
  ): number {
    const pointsCount: number = allPlayerStats
      .map((playerStat) => {
        return playerStat.wonPointsCount;
      })
      .reduce((player1win, player2win) => {
        return player1win + player2win;
      });

    return pointsCount - playerStat.totalServedPointsCount;
  }
}
