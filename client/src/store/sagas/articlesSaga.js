import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from "../../axios_post";

export function* fetchArticlesSaga(action) {
    yield put(actions.fetchArticlesStart())
    let url = "posts/";
    try {
        const response = yield axios.get(url, { headers: {"Authorization" : `Bearer ${action.token}`} });
        yield put(
            actions.fetchArticlesSuccess(response.data)
        );
    } catch (error) {
        yield put(actions.fetchArticlesFail(error.response.data.error));
    }
}

export function* fetchArticleByIdSaga(action) {
    yield put(actions.fetchArticlesStart())
    let url = `posts/${action.id}`;
    try {
        const response = yield axios.get(url, { headers: {"Authorization" : `Bearer ${action.token}`} });
        yield put(
            actions.fetchArticleByIdSuccess(response.data)
        );
    } catch (error) {
        yield put(actions.fetchArticlesFail(error.response.data.error));
    }
}