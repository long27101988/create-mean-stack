import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../share/util';

const initialState = {
    articles: [],
    loading: false,
    error: null,
    article: null
};

const fetchArticlesStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    })
}

const fetchArticlesSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        articles: action.articles
    })
}

const fetchArticlesFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

//fetch article by id
const fetchArticleByIdStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    })
}

const fetchArticleByIdSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        article: action.article
    })
}

const fetchArticleByIdFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_ARTICLES_START: return fetchArticlesStart(state, action);
        case actionTypes.FETCH_ARTICLES_SUCCESS: return fetchArticlesSuccess(state, action);
        case actionTypes.FETCH_ARTICLES_FAIL: return fetchArticlesFail(state, action);
        case actionTypes.FETCH_ARTICLE_BY_ID_START: return fetchArticleByIdStart(state, action);
        case actionTypes.FETCH_ARTICLE_BY_ID_SUCCESS: return fetchArticleByIdSuccess(state, action);
        case actionTypes.FETCH_ARTICLE_BY_ID_FAIL: return fetchArticleByIdFail(state, action)
        default: return state;
    }
}

export default reducer;