import { all } from 'redux-saga/effects';
import { watchCategorySaga } from './categorySaga';
import { watchLoginSaga } from './loginSaga';

export default function* rootSaga() {
    yield all([watchLoginSaga(), watchCategorySaga()]);
}
