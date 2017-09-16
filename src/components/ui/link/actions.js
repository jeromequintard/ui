import { bindActionCreators } from 'redux';
import { uniqTypes, createAction, getOid } from 'osiki-core';

import { push, replace } from 'components/middleware/history/actions';

export const actions = dispatch => bindActionCreators({
  push,
  replace,
}, dispatch);
