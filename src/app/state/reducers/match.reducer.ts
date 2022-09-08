import { IMatch } from 'src/app/models/match';
import { MatchAction, MatchActionsEnum } from '../actions/match.actions';

interface MatchState {
  match: IMatch;
}

const initialState: MatchState = {
  match: null,
};

export function matchReducer(state: MatchState = initialState, action: MatchAction): MatchState {
  switch(action.type) {
    case MatchActionsEnum.UpdateMatch:
      return {
        ...state,

      }
  }
}
