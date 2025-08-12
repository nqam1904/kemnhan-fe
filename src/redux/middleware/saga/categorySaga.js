import * as Types from '../../action/categoryAction';
import { put, takeEvery } from 'redux-saga/effects';
import { categoryApi } from '../api/categoryApi';
const error = 'Không thể kết nối được với máy chủ';

function* categorySaga(action) {
    try {
        const response = yield categoryApi(action.data);

        if (response === undefined) {
            yield put({ type: Types.CATEGORY_ERROR, error });
        } else {
            yield put({ type: Types.CATEGORY_SUCCESS, data: response });
        }
    } catch (error) {
        yield put({ type: Types.CATEGORY_ERROR, error });
    }
}
export function* watchCategorySaga() {
    yield takeEvery(Types.CATEGORY, categorySaga);
}
