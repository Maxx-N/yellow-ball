import { IMatch } from './match';
import { Game, IGame } from './game';
import { IPlayer } from './player';

export interface ISet {
  id: string;
  position: number;
  games: IGame[];
  getMatch(allMatches: IMatch[]): IMatch;
  getCurrentGame(): IGame;
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

  newGame(players: IPlayer[]): void {
    const position = this.games.length + 1;
    const newGame: IGame = new Game({
      position,
      players,
    });
    this.games.push(newGame);
  }
}
