// import { REHYDRATE } from 'redux-persist/constants';

import { types } from './actions';

const initialState = {
  currentLanguage: 'fr-FR',
  locales: [],
};

const setComponentsLocales = (state, payload) => ({
  ...state,
  [payload.oid]: payload.locales,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.payload.tag,
      };
    case types.SET_LOCALES:
      return {
        ...state,
        locales: setComponentsLocales(state.locales, action.payload),
      };
    default:
      return state;
  }
};
