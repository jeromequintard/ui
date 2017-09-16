import { types } from './actions';

import { DataboundState } from './types';

const stateInitialState = {
  databound: DataboundState.Wait,
  error: null,
};

const uidInitialState = {
  data: [],
  state: stateInitialState,
  action: types.NONE,
};

const selectInitialState = {
  uid: [],
};

const stateReducer = (state, action) => {
  switch (action.type) {

    case types.GET_DATA:
      return {
        ...state,
        databound: DataboundState.Load,
      };

    case types.GET_DATA_DONE:
      return {
        ...state,
        databound: DataboundState.Loaded,
      };

    case types.GET_DATA_FAILED:
      return {
        ...state,
        databound: DataboundState.Error,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

const uidReducer = (state, action) => {
  const uidState = (state[action.payload.uid] === undefined) ? uidInitialState : state[action.payload.uid];

  switch (action.type) {
    case types.GET_DATA:
      return {
        ...state,
        [action.payload.uid]: {
          ...uidState,
          state: stateReducer(uidState.state, action),
          action: action.type,
        },
      };

    // A la réception des données
    case types.GET_DATA_DONE:
      return {
        ...state,
        [action.payload.uid]: {
          data: action.payload.result.data,
          state: stateReducer(uidState.state, action),
          action: action.type,
        },
      };

    // En cas d'échec de réception
    case types.GET_DATA_FAILED:
      return {
        ...state,
        [action.payload.uid]: {
          ...uidState,
          state: stateReducer(uidState.state, action),
          action: action.type,
        },
      };

    default:
      return state;
  }
};

export default (state = selectInitialState, action) => {
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
