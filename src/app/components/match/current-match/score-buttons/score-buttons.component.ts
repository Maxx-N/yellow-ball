import { Component, OnInit } from '@angular/core';

import { IMatch } from 'src/app/models/match';
import { IPlayer } from 'src/app/models/player';
import { PointProcess } from 'src/app/models/point-process.type';
import { MatchService } from 'src/app/services/match/match.service';

@Component({
  selector: 'app-score-buttons',
  templateUrl: './score-buttons.component.html',
  styleUrls: ['./score-buttons.component.scss'],
})
export class ScoreButtonsComponent implements OnInit {
  players: any[] = [
    { name: 'Federer', isServing: true },
    { name: 'Nadal', isServing: false },
  ];

  currentMatch: IMatch;

  constructor(public matchService: MatchService) {}

  ngOnInit(): void {
    this.currentMatch = this.matchService.getCurrentMatch();
    this.matchService.currentMatchSubject.subscribe((match) => {
      this.currentMatch = match;
    });
  }

  onTriggerProcess(process: PointProcess, player: IPlayer) {
    this.matchService.triggerProcess(process, player);
  }
}
