import { IMatch, Match } from '../models/match';

export function copyMatch(match: IMatch): IMatch {
  const copy = new Match({
    players: null,
    server: null,
    isFinalSetTiebreak: null,
    setsNumber: null,
  });
  for (const key of Object.keys(match)) {
    copy[key] = match[key];
  }
  return copy;
}
