import { Component, OnInit } from '@angular/core';

import { IMatch } from 'src/app/models/match';
import { MatchService } from 'src/app/services/match/match.service';

// export interface PlayerScore {
//   playerName: string;
//   firstSet: number;
//   secondSet?: number;
//   thirdSet?: number;
//   fourthSet?: number;
//   fifthSet?: number;
//   currentGame: number;
//   isServing: boolean;
// }

// const ELEMENT_DATA: PlayerScore[] = [
//   {
//     playerName: 'Federer',
//     firstSet: 6,
//     secondSet: 7,
//     thirdSet: 6,
//     fourthSet: 0,
//     currentGame: 15,
//     isServing: true,
//   },
//   {
//     playerName: 'Nadal',
//     firstSet: 4,
//     secondSet: 5,
//     thirdSet: 7,
//     fourthSet: 1,
//     currentGame: 40,
//     isServing: false,
//   },
// ];

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
})
export class ScoreBoardComponent implements OnInit {
  currentMatch: IMatch;
  dataSource: any[];
  displayedColumns: string[];

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.setCurrentMatch(this.matchService.getCurrentMatch());
    this.matchService.currentMatchSubject.subscribe((match) => {
      this.setCurrentMatch(match);
    });
  }

  private setCurrentMatch(match: IMatch): void {
    this.currentMatch = match;
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
        isServing: false,
      };
    });
  }

  private setDisplayedColumns(): void {
    this.displayedColumns = this.dataSource.some((el) => el.isServing)
      ? [
          'player-name',
          'is-serving',
          'first-set',
          'second-set',
          'third-set',
          'fourth-set',
          'fifth-set',
          'current-game',
        ]
      : [
          'player-name',
          'first-set',
          'second-set',
          'third-set',
          'fourth-set',
          'fifth-set',
          'current-game',
        ];
  }
}
