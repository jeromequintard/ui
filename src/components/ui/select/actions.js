import { bindActionCreators } from 'redux';
import { uniqTypes, createAction, getOid } from 'osiki-core';

import manifest from 'manifest.json';

export const types = uniqTypes(
  getOid(manifest, 'Select'), [
    'GET_DATA',
    'GET_DATA_DONE',
    'GET_DATA_FAILED',
  ],
);

export const getData = createAction(types.GET_DATA, (uid, func) => ({ uid, func }));
export const getDataDone = createAction(types.GET_DATA_DONE, (uid, result) => ({ uid, result }));
export const getDataFailed = createAction(types.GET_DATA_FAILED, (uid, error) => ({ uid, error }));

export const actions = dispatch => bindActionCreators({
  getData,
}, dispatch);

export default {
  getData,
};
