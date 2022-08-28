import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatchComponent } from './components/match/match.component';
import { PlayerComponent } from './components/player/player.component';
import { CurrentMatchComponent } from './components/match/current-match/current-match.component';
import { MatchListComponent } from './components/match/match-list/match-list.component';

const routes: Routes = [
  {
    path: 'match',
    component: MatchComponent,
    children: [
      { path: 'current', component: CurrentMatchComponent },
      { path: 'all', component: MatchListComponent },
      { path: '**', redirectTo: 'current' },
    ],
  },
  { path: 'player', component: PlayerComponent },
  { path: '**', redirectTo: 'match' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
