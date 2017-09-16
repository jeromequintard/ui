import { bindActionCreators } from 'redux';
import { uniqTypes, createAction, getOid } from 'osiki-core';

import manifest from 'manifest.json';

export const types = uniqTypes(
  getOid(manifest, 'Gravatar'), [
    'GET_GRAVATAR',
    'GET_GRAVATAR_DONE',
    'GET_GRAVATAR_FAILED',
    'GET_GRAVATAR_TIMEOUT',
    'RESET_GRAVATAR',
  ],
);

// On génère une action dépendant des constantes crées
export const getGravatar = createAction(types.GET_GRAVATAR, (email, size) => ({ email, size }));
export const getGravatarDone = createAction(types.GET_GRAVATAR_DONE, url => ({ url }));
export const getGravatarFailed = createAction(types.GET_GRAVATAR_FAILED);
export const getGravatarTimeout = createAction(types.GET_GRAVATAR_TIMEOUT);
export const resetGravatar = createAction(types.RESET_GRAVATAR);

export const actions = dispatch => bindActionCreators({
  getGravatar,
  resetGravatar,
}, dispatch);
