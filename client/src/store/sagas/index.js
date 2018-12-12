import {
    takeEvery
} from 'redux-saga/effects';

import {
    signUpSaga,
    loginSaga,
    checkAuthTimeoutSaga,
    authCheckStateSaga,
    logoutSaga
} from './authSaga'

import {
    fetchArticlesSaga,
    fetchArticleByIdSaga
} from './articlesSaga'

import * as actionTypes from '../actions/actionTypes';


export function* watchAuth() {
    yield takeEvery(actionTypes.REGISTER, signUpSaga)
    yield takeEvery(actionTypes.AUTH, loginSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
}

export function* watchArticles() {
    yield takeEvery(actionTypes.FETCH_ARTICLES, fetchArticlesSaga)
    yield takeEvery(actionTypes.FETCH_ARTICLE_BY_ID, fetchArticleByIdSaga)
}