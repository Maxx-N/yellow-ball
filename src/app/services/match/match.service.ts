import { Injectable } from '@angular/core';

import { IMatch, Match } from 'src/app/models/match';
import { IPlayer } from 'src/app/models/player';
import { PlayerService } from '../player/player.service';
import * as matchHelpers from 'src/app/helpers/match.helpers';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private currentMatch: IMatch;

  constructor(private playerService: PlayerService) {}

  getCurrentMatch(): IMatch {
    return matchHelpers.copyMatch(this.currentMatch);
  }

  createNewMatch(): void {
    this.currentMatch = new Match({
      players: this.get2PlayersByName('nadal', 'djokovic'),
      isFinalSetTiebreak: false,
      setsNumber: 5,
    });
  }

  private get2PlayersByName(...playerNames: string[]): IPlayer[] {
    return playerNames.map((playerName) => {
      return this.playerService.getPlayers().find((player) => {
        return player.lastName.toLowerCase() === playerName.toLowerCase();
      });
    });
  }
}
