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
    const finalStats: any[] = [
      {
        statName: 'Aces',
        statsPlayer: initialStats.map((stat) => {
          return {
            displayedData: stat.acesCount,
            percentageOfTotal:
              (stat.acesCount /
                (stat.acesCount +
                  initialStats.find((s) => s.player.id !== stat.player.id)
                    .acesCount)) *
              100,
          };
        }),
      },
    ];
    this.statsToDisplay = finalStats;
  }

  private getPlayerStats(currentMach: IMatch): IPlayerStats[] {
    return currentMach.players.map((player) => {
      return this.matchService.getPlayerStats(player);
    });
  }
}
