import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-bar',
  templateUrl: './stat-bar.component.html',
  styleUrls: ['./stat-bar.component.scss'],
})
export class StatBarComponent implements OnInit {
  @Input() statPlayers: any[];

  constructor() {}

  ngOnInit(): void {
  }
}
