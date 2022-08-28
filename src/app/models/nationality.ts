import { IPlayer } from './player';

export interface INationality {
  id: string;
  name: string;
  code: string;
  flagUrl?: string;
  getPlayers(allPlayers: IPlayer[]): IPlayer[];
}

export class Nationality implements INationality {
  id: string;
  name: string;
  code: string;
  flagUrl?: string;

  constructor({
    name,
    code,
    flagUrl,
  }: {
    name: string;
    code: string;
    flagUrl?: string;
  }) {
    this.id = Math.floor(Math.random() * 1000000).toString();
    this.name = name;
    this.code = code;
    this.flagUrl = flagUrl ? flagUrl : null;
  }

  getPlayers(allPlayers: IPlayer[]): IPlayer[] {
    return allPlayers.filter((player) => player.nationalityId === this.id);
  }
}
