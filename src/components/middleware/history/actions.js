import { bindActionCreators } from 'redux';
import { uniqTypes, createAction, getOid } from 'osiki-core';

import manifest from 'manifest.json';

export const types = uniqTypes(
  getOid(manifest, 'history'), [
    'HISTORY_PUSH',
    'HISTORY_REPLACE',
  ],
);

/* Gestion du routage */
export const push = createAction(types.HISTORY_PUSH, path => (path));
export const replace = createAction(types.HISTORY_REPLACE, path => (path));

export const actions = dispatch => bindActionCreators({
  push,
  replace,
}, dispatch);

export default {
  push,
  replace,
};
