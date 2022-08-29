import { IMatch } from './match';
import { Game, IGame } from './game';
import { IPlayer } from './player';

export interface ISet {
  id: string;
  position: number;
  games: IGame[];
  getMatch(allMatches: IMatch[]): IMatch;
  getCurrentGame(): IGame;
  getPlayerScore(player: IPlayer): number;
  getWinner(): IPlayer;
  newGame(players: IPlayer[]): void;
}

export class Set implements ISet {
  id: string;
  position: number;
  games: IGame[];

  constructor({ position, players }: { position: number; players: IPlayer[] }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.position = position;
    this.games = [];
    this.newGame(players);
  }

  getMatch(allMatches: IMatch[]): IMatch {
    return allMatches.find((match) => {
      return match.sets.map((set) => set.id).includes(this.id);
    });
  }

  getCurrentGame(): IGame {
    return this.games[this.games.length - 1];
  }

  getPlayerScore(player: IPlayer): number {
    let score: number = 0;
    for (const game of this.games) {
      if (game.getWinner().id === player.id) {
        score++;
      }
    }
    return score;
  }

  getWinner(): IPlayer {
    const players: IPlayer[] = this.games[0].playerGames.map((playerGame) => {
      return playerGame.player;
    });

    if (
      players.some((player) => {
        this.getPlayerScore(player) >= 6;
      })
    ) {
      if (
        players.some((player) => {
          this.getPlayerScore(player) <= 4;
        })
      ) {
        return players.find((player) => {
          this.getPlayerScore(player) >= 6;
        });
      } else {
        return players.find((player) => {
          this.getPlayerScore(player) >= 7;
        });
      }
    } else {
      return null;
    }
  }

  newGame(players: IPlayer[]): void {
    const position = this.games.length + 1;
    const newGame: IGame = new Game({
      position,
      players,
    });
    this.games.push(newGame);
  }
}
