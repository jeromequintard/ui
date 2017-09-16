import { delay } from 'redux-saga';
import { fork, call, put, takeLatest } from 'redux-saga/effects';

import GravatarApi from './api';

import { types, getGravatarDone } from './actions';

function* getGravatar(action) {
  const { payload: { email, size } } = action;
  // On impose un léger délai
  // l'utilisateur est peut être en train
  // de taper des caractères
  yield call(delay, 200);
  // On execute la fonction de l'API
  const url = yield call(GravatarApi.getGravatar, email, size);
  // On execute la fonction getGravatarDone
  yield put(getGravatarDone(url));
}

export default function* saga() {
  yield takeLatest(types.GET_GRAVATAR, getGravatar);
}
