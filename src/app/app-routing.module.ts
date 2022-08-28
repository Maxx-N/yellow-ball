import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatchComponent } from './components/match/match.component';
import { PlayerComponent } from './components/player/player.component';

const routes: Routes = [
  { path: 'match', component: MatchComponent },
  { path: 'player', component: PlayerComponent },
  { path: '**', redirectTo: 'match' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
