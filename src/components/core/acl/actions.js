import { uniqTypes, createAction, getOid } from 'osiki-core';
import { bindActionCreators } from 'redux';

import manifest from 'manifest.json';

import { push } from 'components/middleware/history/actions';

export const types = uniqTypes(
  getOid(manifest, 'acl'), [
    'ACL_CHECK',
    'ACL_CHECK_DONE',
  ],
);

export const aclCheck = createAction(types.ACL_CHECK);
export const aclCheckDone = createAction(types.ACL_CHECK_DONE, status => ({ status }));

export const actions = dispatch => bindActionCreators({
  aclCheck,
  aclCheckDone,
  push,
}, dispatch);
