import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IMatch, Match } from 'src/app/models/match';
import { IPlayer } from 'src/app/models/player';
import { PlayerService } from '../player/player.service';
import * as matchHelpers from 'src/app/helpers/match.helpers';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private currentMatch: IMatch;
  currentMatchSubject = new Subject<IMatch>();

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
    this.currentMatchSubject.next(this.getCurrentMatch());
  }

  winPoint(player: IPlayer): void {
    this.currentMatch.addPointToPlayer(player);
    this.currentMatchSubject.next(this.getCurrentMatch());
    this.logScore();
  }

  private get2PlayersByName(...playerNames: string[]): IPlayer[] {
    return playerNames.map((playerName) => {
      return this.playerService.getPlayers().find((player) => {
        return player.lastName.toLowerCase() === playerName.toLowerCase();
      });
    });
  }

  private logScore(): void {
    const stringScores = [];
    for (const player of this.currentMatch.players) {
      let scoreString = `${player.lastName} - `;
      for (const set of this.currentMatch.sets) {
        scoreString += set.getPlayerScore(player);
        scoreString += ' ';
      }
      scoreString += '| ';
      scoreString += this.currentMatch.getCurrentGame().getPlayerScore(player);
      stringScores.push(scoreString);
    }
    let newString = '';
    stringScores.forEach((str) => {
      newString += str;
      newString += '\n';
    });
    console.log(newString);
    console.log('\n');

    if (!!this.currentMatch.getCurrentSet().getWinner()) {
      console.log('SET OVER');
    }
    if (!!this.currentMatch.getWinner()) {
      console.log(
        `\nJEUX, SET ET MATCH ${this.currentMatch.getWinner().lastName} !!!`
      );
    }
  }
}
