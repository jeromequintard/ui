import { createReducer } from 'osiki-core';

import { types } from './actions';

const initialState = {
  url: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_GRAVATAR_DONE:
      return {
        url: action.payload.url,
      };

    case types.RESET_GRAVATAR:
      return {
        url: null,
      };

    default:
      return state;
  }
};
