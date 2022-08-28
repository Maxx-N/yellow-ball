import { Injectable } from '@angular/core';

import { Game, IGame } from 'src/app/models/game';
import { IMatch, Match } from 'src/app/models/match';
import { IPlayer } from 'src/app/models/player';
import { IPlayerGame, PlayerGame } from 'src/app/models/player-game';
import { ISet, Set } from 'src/app/models/set';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentMatchService {
  private currentMatch: IMatch;
  private sets: ISet[] = [];
  private games: IGame[] = [];
  private playerGames: IPlayerGame[] = [];
  private currentSet: ISet;
  private currentGame: IGame;

  getMatch(): IMatch {
    return { ...this.currentMatch };
  }

  getSets(): ISet[] {
    return [...this.sets];
  }

  getGames(): IGame[] {
    return [...this.games];
  }

  constructor(private playerService: PlayerService) {}

  createNewMatch(): void {
    this.currentMatch = new Match({
      players: this.get2PlayersByName('djokovic', 'nadal'),
      isFinalSetTiebreak: false,
      setsNumber: 5,
    });
    this.createNewSet();
  }

  private createNewSet(): void {
    const position = this.currentMatch.getSets(this.getSets()).length + 1;
    const newSet: ISet = new Set({ match: this.currentMatch, position });
    this.currentSet = newSet;
    this.sets.push(newSet);
    this.createNewGame();
  }

  private createNewGame(): void {
    const position = this.currentSet.getGames(this.getGames()).length + 1;
    const newGame: IGame = new Game({ set: this.currentSet, position });
    this.currentGame = newGame;
    this.games.push(newGame);

    for (const player of this.getMatch().getPlayers(
      this.playerService.getPlayers()
    )) {
      this.createNewPlayerGame({ game: newGame, player });
    }
  }

  private createNewPlayerGame({
    game,
    player,
  }: {
    game: IGame;
    player: IPlayer;
  }): void {
    const newPlayerGame: IPlayerGame = new PlayerGame({
      game,
      player,
    });
    this.playerGames.push(newPlayerGame);
  }

  private get2PlayersByName(...playerNames: string[]): IPlayer[] {
    return playerNames.map((playerName) => {
      return this.playerService.getPlayers().find((player) => {
        return player.lastName.toLowerCase() === playerName.toLowerCase();
      });
    });
  }
}
