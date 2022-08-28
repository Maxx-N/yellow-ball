import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-buttons',
  templateUrl: './score-buttons.component.html',
  styleUrls: ['./score-buttons.component.scss'],
})
export class ScoreButtonsComponent implements OnInit {
  players: any[] = [
    { name: 'Federer', isServing: true },
    { name: 'Nadal', isServing: false }
  ];

  constructor() {}

  ngOnInit(): void {}
}
