import { Component, OnInit } from '@angular/core';

export interface PlayerScore {
  playerName: string;
  firstSet: number;
  secondSet?: number;
  thirdSet?: number;
  fourthSet?: number;
  fifthSet?: number;
  currentGame: number;
  isServing: boolean;
}

const ELEMENT_DATA: PlayerScore[] = [
  {
    playerName: 'Federer',
    firstSet: 6,
    secondSet: 7,
    thirdSet: 6,
    fourthSet: 0,
    currentGame: 15,
    isServing: true,
  },
  {
    playerName: 'Nadal',
    firstSet: 4,
    secondSet: 5,
    thirdSet: 7,
    fourthSet: 1,
    currentGame: 40,
    isServing: false,
  },
];

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
})
export class ScoreBoardComponent implements OnInit {
  displayedColumns: string[] = [
    'player-name',
    'first-set',
    'second-set',
    'third-set',
    'fourth-set',
    'fifth-set',
    'current-game',
  ];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}
}
