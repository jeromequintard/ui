import { types } from './actions';

import { DataboundState } from './types';

const formInitialState = {
  data: [],
  databound: DataboundState.Wait,
  error: null,
};

const initialState = {
  uid: [],
};

const uidReducer = (state, action) => {
  const uidState = (state[action.payload.uid] === undefined) ? formInitialState : state[action.payload.uid];

  switch (action.type) {
    case types.GET_DATA:
      return {
        ...state,
        [action.payload.uid]: {
          ...uidState,
          databound: DataboundState.Load,
        },
      };

    // A la réception des données
    case types.GET_DATA_DONE:
      return {
        ...state,
        [action.payload.uid]: {
          data: action.payload.result, // .data,
          databound: DataboundState.Loaded,
        },
      };

    // En cas d'échec de réception
    case types.GET_DATA_FAILED:
      return {
        ...state,
        [action.payload.uid]: {
          ...uidState,
          databound: DataboundState.Error,
          error: action.payload.error,
        },
      };

    default:
      return state;
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DATA:
    case types.GET_DATA_DONE:
    case types.GET_DATA_FAILED:
      return {
        ...state,
        uid: uidReducer(state.uid, action),
      };

    default:
      return state;
  }
};
