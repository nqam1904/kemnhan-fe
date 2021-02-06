import * as Types from "../../action/loginAction"
import { put, takeEvery } from 'redux-saga/effects';
import { loginApi } from '../api/loginApi';
const error = "Không kết nối được với máy chủ";
function* loginSaga(action) {
    try {
        const response = yield loginApi(action.data);
        console.log('res saga', response)
        if (response.is_success !== true) {
            yield put({ type: Types.LOGIN_ERROR, error });
        } else {
            // localStorage.setItem("token", response.access_token);
            yield put({ type: Types.LOGIN_SUCCESS, response });
        }
    } catch (error) {
        yield put({ type: Types.LOGIN_ERROR, error });
    }
}
export function* watchLoginSaga() {
    yield takeEvery(Types.LOGIN, loginSaga);
}

// export function* watchLoginSuccessSaga() {
//     yield takeEvery(Types.LOGIN_SUCCESS, loginSaga);
// }