import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IMatch } from 'src/app/models/match';
import { IPlayer } from 'src/app/models/player';
import { IPlayerStats } from 'src/app/models/player-stats';
import { MatchService } from 'src/app/services/match/match.service';
import * as statHelpers from 'src/app/helpers/stats.helpers';

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
      statHelpers.getAcesStatsPlayer(allPlayerStats),
      statHelpers.getFirstServesStatsPlayer(allPlayerStats),
      statHelpers.getDoubleFaultsStatsPlayer(allPlayerStats),
      statHelpers.getWinOnFirstServesStatsPlayer(allPlayerStats),
      statHelpers.getWinOnSecondServesStatsPlayer(allPlayerStats),
      statHelpers.getPointsWonStatsPlayer(allPlayerStats),
      statHelpers.getReceivingPointsWonStatsPlayer(allPlayerStats),
      statHelpers.getWinnersStatsPlayer(allPlayerStats),
      statHelpers.getForcedErrorsStatsPlayer(allPlayerStats),
      statHelpers.getUnforcedErrorsStatsPlayer(allPlayerStats),
      statHelpers.getBreakPointsStatsPlayer(allPlayerStats),
      statHelpers.getBreakPointsConversionsStatsPlayer(allPlayerStats),
    ];
  }

  private getPlayerStats(currentMach: IMatch): IPlayerStats[] {
    return currentMach.players.map((player) => {
      return this.matchService.getPlayerStats(player);
    });
  }
}
