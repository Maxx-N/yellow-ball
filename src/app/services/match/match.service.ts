import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import * as matchHelpers from 'src/app/helpers/match.helpers';
import { IMatch, Match } from 'src/app/models/match';
import { IPlayer } from 'src/app/models/player';
import { IPlayerGame } from 'src/app/models/player-game';
import { IPlayerStats } from 'src/app/models/player-stats';
import { PointProcess } from 'src/app/models/point-process.type';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private currentMatch: IMatch;
  currentMatchSubject = new Subject<IMatch>();
  isSecondServe: boolean = false;

  constructor(private playerService: PlayerService) {}

  getCurrentMatch(): IMatch {
    return matchHelpers.copyMatch(this.currentMatch);
  }

  createNewMatch(): void {
    const players = this.get2PlayersByName('nadal', 'djokovic');
    const server = players[Math.floor(Math.random() * players.length)];
    this.currentMatch = new Match({
      players,
      isFinalSetTiebreak: false,
      setsNumber: 3,
      server,
    });
    this.currentMatchSubject.next(this.getCurrentMatch());
  }

  triggerProcess(process: PointProcess, player: IPlayer) {
    switch (process) {
      case 'ace':
        this.aceProcess(player);
        break;
      case 'fault':
        this.faultProcess(player);
        break;
      case 'winner':
        this.winnerProcess(player);
        break;
      case 'forced-error':
        this.forcedErrorProcess(player);
        break;
      case 'unforced-error':
        this.unforcedErrorProcess(player);
        break;
    }

    const server: IPlayer = this.currentMatch.getCurrentServer();

    if (!this.isSecondServe) {
      this.getPlayerGameByPlayer(server).totalServedPointsCount++;
      if (process !== 'fault') {
        this.getPlayerGameByPlayer(server).firstServesCount++;
      }
    }

    if (process === 'fault') {
      this.isSecondServe = !this.isSecondServe;
    } else {
      this.isSecondServe = false;
    }

    this.currentMatchSubject.next(this.getCurrentMatch());
  }

  getPlayerStats(player: IPlayer): IPlayerStats {
    const statKeys: string[] = [
      'acesCount',
      'firstServesCount',
      'doubleFaultsCount',
      'wonFirstServesCount',
      'wonSecondServesCount',
      'wonPointsCount',
      'wonReceivingPointsCount',
      'winnerPointsCount',
      'forcedErrorsCount',
      'unforcedErrorsCount',
      'breakPointsCount',
      'breakPointConversionsCount',
      'totalServedPointsCount',
    ];

    const playerGamesArray = [];
    for (const set of this.currentMatch.sets) {
      for (const game of set.games) {
        const playerGame = game.playerGames.find((playerGame) => {
          return playerGame.player.id === player.id;
        });
        playerGamesArray.push(playerGame);
      }
    }

    const stats = { player };

    for (const key of statKeys) {
      const valuesArray: number[] = playerGamesArray.map((pg) => pg[key]);
      stats[key] = valuesArray.reduce((initialValue, currentValue) => {
        return !!currentValue ? initialValue + currentValue : initialValue;
      });
    }

    return stats as IPlayerStats;
  }

  private aceProcess(player: IPlayer): void {
    const playerGame: IPlayerGame = this.getPlayerGameByPlayer(player);
    playerGame.acesCount++;
    this.winPoint(player);
  }

  private faultProcess(player: IPlayer): void {
    if (this.isSecondServe) {
      this.getPlayerGameByPlayer(player).doubleFaultsCount++;
      this.winPoint(this.getOtherPlayer(player));
    }
  }

  private winnerProcess(player: IPlayer): void {
    this.getPlayerGameByPlayer(player).winnerPointsCount++;
    this.winPoint(player);
  }

  private forcedErrorProcess(player: IPlayer): void {
    this.getPlayerGameByPlayer(player).forcedErrorsCount++;
    this.winPoint(this.getOtherPlayer(player));
  }

  private unforcedErrorProcess(player: IPlayer): void {
    this.getPlayerGameByPlayer(player).unforcedErrorsCount++;
    this.winPoint(this.getOtherPlayer(player));
  }

  private winPoint(player: IPlayer): void {
    const playerGame: IPlayerGame = this.getPlayerGameByPlayer(player);
    const isServer = this.currentMatch.getCurrentServer().id === player.id;

    playerGame.wonPointsCount++;

    if (isServer) {
      if (!this.isSecondServe) {
        playerGame.wonFirstServesCount++;
      }
    } else {
      playerGame.wonReceivingPointsCount++;

      if (this.isBreakPoint()) {
        playerGame.breakPointConversionsCount++;
      }
    }

    this.currentMatch.addPointToPlayer(player);
    if (this.isBreakPoint()) {
      this.getPlayerGameByPlayer(player).breakPointsCount++;
    }
  }

  private isBreakPoint(): boolean {
    if (
      this.currentMatch.getCurrentGame().isTieBreak ||
      this.currentMatch.players.some(
        (player) => this.getPlayerScoreInGame(player) === 'W'
      )
    ) {
      return false;
    }

    const server: IPlayer = this.currentMatch.getCurrentServer();
    const receiver: IPlayer = this.getOtherPlayer(server);
    const weakScores: (string | number)[] = ['0', '15', '30'];

    if (weakScores.includes(this.getPlayerScoreInGame(receiver))) {
      return false;
    } else {
      if (this.getPlayerScoreInGame(receiver) === '40') {
        return weakScores.includes(this.getPlayerScoreInGame(server));
      } else {
        return true;
      }
    }
  }

  private getPlayerScoreInGame(player: IPlayer): string | number {
    return this.getPlayerGameByPlayer(player).playerScore;
  }

  private getPlayerGameByPlayer(player: IPlayer): IPlayerGame {
    return this.currentMatch.getCurrentGame().playerGames.find((playerGame) => {
      return playerGame.player.id === player.id;
    });
  }

  private getOtherPlayer(player: IPlayer): IPlayer {
    return this.currentMatch?.players.find((p) => p.id !== player.id);
  }

  private get2PlayersByName(...playerNames: string[]): IPlayer[] {
    return playerNames.map((playerName) => {
      return this.playerService.getPlayers().find((player) => {
        return player.lastName.toLowerCase() === playerName.toLowerCase();
      });
    });
  }
}
