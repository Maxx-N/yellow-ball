import { INationality, Nationality } from '../models/nationality';

export function copyNationality(nationality: INationality): INationality {
  const copy = new Nationality({ name: null, code: null });
  for (const key of Object.keys(nationality)) {
    copy[key] = nationality[key];
  }
  return copy;
}
