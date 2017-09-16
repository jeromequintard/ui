import { types } from './actions';

import { DataboundState } from './types';

const uidInitialState = {
  files: [],
  path: null,
  databound: DataboundState.Wait,
  error: null,
};

const initialState = {
  uid: [],
};

const uidReducer = (state, action) => {
  switch (action.type) {
    case types.GET_DATA:
      return {
        ...state,
        [action.payload.uid]: {
          ...uidInitialState,
          databound: DataboundState.Load,
        },
      };

    // A la réception des données
    case types.GET_DATA_DONE:
      return {
        ...state,
        [action.payload.uid]: {
          ...uidInitialState,
          files: action.payload.result.data,
          path: action.payload.result.path,
          databound: DataboundState.Loaded,
        },
      };

    // En cas d'échec de réception
    case types.GET_DATA_FAILED:
      return {
        ...state,
        [action.payload.uid]: {
          ...uidInitialState,
          databound: DataboundState.Error,
          error: action.payload.error.toString(),
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
