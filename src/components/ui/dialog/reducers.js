import { types } from './actions';
import * as propTypes from './types';

const initialState = {
  state: propTypes.State.Closed,
  parameters: null,
  object: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW:
      return {
        ...state,
        state: propTypes.State.Opening,
        parameters: action.payload.parameters,
        object: action.payload.object,
      };

    case types.HIDE:
      return initialState;

    default:
      return state;
  }
};
