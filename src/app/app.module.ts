import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
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
import { AppRoutingModule } from './app-routing.module';
import { MatchStatsComponent } from './components/match/shared/match-stats/match-stats.component';
import { NewMatchComponent } from './components/match/current-match/new-match/new-match.component';
import { NewPlayerComponent } from './components/player/new-player/new-player.component';
import { StatBarComponent } from './components/match/shared/match-stats/stat-bar/stat-bar.component';
import { StoreModule } from '@ngrx/store';


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
    MatchStatsComponent,
    NewMatchComponent,
    NewPlayerComponent,
    StatBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
