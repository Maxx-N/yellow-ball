import { IMatch, Match } from '../models/match';

export function copyMatch(match: IMatch): IMatch {
  const copy = new Match({ ...match });
  for (const key of Object.keys(match)) {
    copy[key] = match[key];
  }
  return copy;
}
