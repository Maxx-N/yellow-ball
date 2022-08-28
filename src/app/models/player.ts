import { IMatch } from './match';
import { INationality } from './nationality';

export interface IPlayer {
  id: string;
  nationality: INationality;
  firstName: string;
  lastName: string;
  birthDate: Date;
  getMatches(allMatches: IMatch[]): IMatch[];
}

export class Player implements IPlayer {
  id: string;
  nationality: INationality;
  firstName: string;
  lastName: string;
  birthDate: Date;

  constructor({
    nationality,
    firstName,
    lastName,
    birthDate,
  }: {
    nationality: INationality;
    firstName: string;
    lastName: string;
    birthDate?: Date;
  }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.nationality = nationality;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate ? birthDate : null;
  }

  getMatches(allMatches: IMatch[]): IMatch[] {
    return allMatches.filter((match) => {
      return match.players.map((player) => player.id).includes(this.id);
    });
  }
}
