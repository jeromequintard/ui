import { bindActionCreators } from 'redux';
import { uniqTypes, createAction, getOid } from 'osiki-core';

import manifest from 'manifest.json';

export const types = uniqTypes(
  getOid(manifest, 'Dialog'), [
    'SHOW',
    'HIDE',
  ],
);

export const show = createAction(types.SHOW, parameters => ({ parameters }));
export const hide = createAction(types.HIDE);

export const actions = dispatch => bindActionCreators({
  show,
  hide,
}, dispatch);

export default {
  show,
  hide,
};
