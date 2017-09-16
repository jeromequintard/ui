import { types } from './actions';

export default function routerMiddleware(history) {
  return () => next => (action) => {
    switch (action.type) {
      case types.HISTORY_PUSH:
        history.push(action.payload);
        return null;
      case types.HISTORY_REPLACE:
        history.replace(action.payload);
        return null;
      default:
        return next(action);
    }
  };
}
