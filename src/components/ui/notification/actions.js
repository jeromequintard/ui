import { bindActionCreators } from 'redux';
import { uniqTypes, createAction, getOid } from 'osiki-core';

import manifest from 'manifest.json';
import * as propTypes from './types';

export const types = uniqTypes(
  getOid(manifest, 'Notification'), [
    'PUSH_NOTIFICATION',
    'POP_NOTIFICATIONS',
  ],
);

export const pushNotification = createAction(types.PUSH_NOTIFICATION, (message, status = propTypes.Status.Primary) => ({ message, status }));
export const popNotifications = createAction(types.POP_NOTIFICATIONS, count => ({ count }));

export const actions = dispatch => bindActionCreators({
  pushNotification,
  popNotifications,
}, dispatch);

export default {
  pushNotification,
  popNotifications,
};
