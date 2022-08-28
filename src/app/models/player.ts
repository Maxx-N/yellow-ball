import { IMatch } from './match';
import { INationality, Nationality } from './nationality';

export interface IPlayer {
  id: string;
  nationalityId: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  getMatches(allMatches: IMatch[]): IMatch[];
  getNationality(allNationalities: INationality[]): INationality;
}

export class Player implements IPlayer {
  id: string;
  nationalityId: string;
  firstName: string;
  lastName: string;
  birthDate: Date;

  constructor({
    nationality,
    firstName,
    lastName,
    birthDate,
  }: {
    id: string;
    nationality: INationality;
    firstName: string;
    lastName: string;
    birthDate?: Date;
  }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.nationalityId = nationality.id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate ? birthDate : null;
  }

  getNationality(allNationalities: Nationality[]): INationality {
    return allNationalities.find(
      (nationality) => nationality.id === this.nationalityId
    );
  }

  getMatches(allMatches: IMatch[]): IMatch[] {
    return allMatches.filter((match) => match.playerIds.includes(this.id));
  }
}
