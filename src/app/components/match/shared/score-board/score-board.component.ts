import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IMatch } from 'src/app/models/match';
import { MatchService } from 'src/app/services/match/match.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
})
export class ScoreBoardComponent implements OnInit, OnDestroy {
  currentMatch: IMatch;
  dataSource: any[];
  displayedColumns: string[];
  isSecondServe: boolean = false;
  private currentMatchSubscription: Subscription;

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.setCurrentMatch(this.matchService.getCurrentMatch());
    this.matchService.currentMatchSubject.subscribe((match) => {
      this.setCurrentMatch(match);
    });
  }

  ngOnDestroy(): void {
    this.currentMatchSubscription.unsubscribe();
  }

  private setCurrentMatch(match: IMatch): void {
    this.currentMatch = match;
    this.isSecondServe = this.matchService.isSecondServe;
    this.setDataSource();
    this.setDisplayedColumns();
  }

  private setDataSource(): void {
    this.dataSource = this.currentMatch.players.map((player) => {
      return {
        playerName: player.lastName,
        firstSet: this.currentMatch.sets[0].getPlayerScore(player),
        secondSet: this.currentMatch.sets[1]?.getPlayerScore(player),
        thirdSet: this.currentMatch.sets[2]?.getPlayerScore(player),
        fourthSet: this.currentMatch.sets[3]?.getPlayerScore(player),
        fifthSet: this.currentMatch.sets[4]?.getPlayerScore(player),
        currentGame: this.currentMatch.getCurrentGame().getPlayerScore(player),
        isServing: this.currentMatch.getCurrentServer()?.id === player?.id,
        isWinner: this.currentMatch.getWinner()?.id === player?.id,
      };
    });
  }

  private setDisplayedColumns(): void {
    const columnsToDisplay = [
      'player-name',
      'is-serving',
      'first-set',
      'second-set',
      'third-set',
      'fourth-set',
      'fifth-set',
      'current-game',
    ];

    if (this.currentMatch.getWinner()) {
      columnsToDisplay.splice(
        columnsToDisplay.indexOf('is-serving'),
        0,
        'is-winner'
      );
      columnsToDisplay.splice(columnsToDisplay.indexOf('is-serving'), 1);
      columnsToDisplay.splice(columnsToDisplay.indexOf('current-game'), 1);
    }

    this.displayedColumns = columnsToDisplay;
  }
}
