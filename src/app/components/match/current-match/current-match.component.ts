import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match/match.service';

@Component({
  selector: 'app-current-match',
  templateUrl: './current-match.component.html',
  styleUrls: ['./current-match.component.scss'],
})
export class CurrentMatchComponent implements OnInit {
  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.matchService.createNewMatch();
  }
}
