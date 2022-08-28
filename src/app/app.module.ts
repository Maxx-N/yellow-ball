import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatchComponent } from './components/match/match.component';
import { CurrentMatchComponent } from './components/match/current-match/current-match.component';
import { ScoreButtonsComponent } from './components/match/current-match/score-buttons/score-buttons.component';
import { MatchListComponent } from './components/match/match-list/match-list.component';
import { MatchDetailComponent } from './components/match/match-detail/match-detail.component';
import { ScoreBoardComponent } from './components/match/shared/score-board/score-board.component';
import { PlayerComponent } from './components/player/player.component';
import { PlayerListComponent } from './components/player/player-list/player-list.component';
import { PlayerDetailComponent } from './components/player/player-detail/player-detail.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchComponent,
    CurrentMatchComponent,
    ScoreButtonsComponent,
    MatchListComponent,
    MatchDetailComponent,
    ScoreBoardComponent,
    PlayerComponent,
    PlayerListComponent,
    PlayerDetailComponent,
    NavMenuComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
