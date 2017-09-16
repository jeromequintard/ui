import { newGUID } from 'osiki-core';
import { types } from './actions';

const initialState = {
  notifications: [],
};

export default (state = initialState, action) => {
  switch (action.type) {

    case types.PUSH_NOTIFICATION: {
      const notifications = state.notifications;
      notifications.push({
        message: action.payload.message,
        status: action.payload.status,
        oid: newGUID(2),
      });
      return { notifications };
    }

    case types.POP_NOTIFICATIONS: {
      const notifications = state.notifications;
      notifications.splice(0, action.payload.count);
      return { notifications };
    }

    default:
      return state;
  }
};
