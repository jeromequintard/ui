import { bindActionCreators } from 'redux';
import { uniqTypes, createAction, getOid } from 'osiki-core';

import manifest from 'manifest.json';

export const types = uniqTypes(
  getOid(manifest, 'translation'), [
    'SET_LOCALES',
    'SET_LANGUAGE',
  ],
);

export const setLocales = createAction(types.SET_LOCALES, (locales, oid) => ({ locales, oid }));
export const setLanguage = createAction(types.SET_LANGUAGE, tag => ({ tag }));

export const actions = dispatch => bindActionCreators({
  setLocales,
  setLanguage,
}, dispatch);

export default {
  setLocales,
  setLanguage,
};
