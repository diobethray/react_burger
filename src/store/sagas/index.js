import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { 
    logoutSaga, 
    checkAuthTimeoutSaga, 
    authUserSaga,
    authCheckStateSaga
} from './auth';

export function* watchAuth() {
    /* yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga); */
    /* yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]); */
    yield all([
        takeLatest(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeLatest(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeLatest(actionTypes.AUTH_USER, authUserSaga),
        takeLatest(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}