import { fork, takeEvery, call, put } from 'redux-saga/effects';

import {
  types,
  getDataDone,
  getDataFailed,
} from './actions';

import { models } from './selectors';

function* loadData(action) {
  const { payload: { uid, func } } = action;

  try {
    // On appelle la méthode pour obtenir les données
    const response = yield call(func);
    yield put(getDataDone(uid, response));
  } catch (e) {
    yield put(getDataFailed(uid, e));
  }
}

function* getData() {
  yield takeEvery(types.GET_DATA, loadData);
}

export default function* saga() {
  yield fork(getData);
}
