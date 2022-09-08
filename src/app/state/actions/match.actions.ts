import { Action } from '@ngrx/store';

export enum MatchActionsEnum {
  UpdateMatch = '[Match] Update Match',
}

export class UpdateMatchAction implements Action {
  readonly type: string = MatchActionsEnum.UpdateMatch;
  payload: string;

  constructor(matchId: string) {
    this.payload = matchId;
  }
}

export type MatchAction = UpdateMatchAction;
