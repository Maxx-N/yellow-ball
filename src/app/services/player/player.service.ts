import { CdkCell } from '@angular/cdk/table';
import { Injectable } from '@angular/core';

import { INationality, Nationality } from 'src/app/models/nationality';
import { IPlayer, Player } from 'src/app/models/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private nationalities: INationality[] = [
    new Nationality({ code: 'BRA', name: 'Brazil' }),
    new Nationality({ code: 'CHE', name: 'Switzerland' }),
    new Nationality({ code: 'DEU', name: 'Germany' }),
    new Nationality({ code: 'ESP', name: 'Spain' }),
    new Nationality({ code: 'FR', name: 'France' }),
    new Nationality({ code: 'GBR', name: 'United Kingdom' }),
    new Nationality({ code: 'RUS', name: 'Russia' }),
    new Nationality({ code: 'SRB', name: 'Serbia' }),
    new Nationality({ code: 'SWE', name: 'Sweden' }),
    new Nationality({ code: 'USA', name: 'United States' }),
  ];

  private players: IPlayer[] = [
    new Player({
      firstName: 'Roger',
      lastName: 'Federer',
      nationality: this.getNationalityByCode('che'),
      birthDate: new Date(1981, 8 - 1, 8),
    }),
    new Player({
      firstName: 'Rafael',
      lastName: 'Nadal',
      nationality: this.getNationalityByCode('esp'),
      birthDate: new Date(1986, 6 - 1, 3),
    }),
    new Player({
      firstName: 'Novak',
      lastName: 'Djokovic',
      nationality: this.getNationalityByCode('srb'),
      birthDate: new Date(1987, 5 - 1, 22),
    }),
  ];

  constructor() {}

  getPlayers(): IPlayer[] {
    return [...this.players];
  }

  getNationalities(): INationality[] {
    return [...this.nationalities];
  }

  getNationalityByCode(code: string): INationality {
    return {
      ...this.getNationalities().find(
        (nationality) => nationality.code.toLowerCase() === code.toLowerCase()
      ),
    };
  }
}
