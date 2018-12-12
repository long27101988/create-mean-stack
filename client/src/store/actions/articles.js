import * as actionTypes from './actionTypes';

export const fetchArticlesSuccess = (articles) => {
    return {
        type: actionTypes.FETCH_ARTICLES_SUCCESS,
        articles: articles
    }
};

export const fetchArticlesFail = (error) => {
    return {
        type: actionTypes.FETCH_ARTICLES_FAIL,
        error: error
    }
};

export const fetchArticlesStart = () => {
    return {
        type: actionTypes.FETCH_ARTICLES_START
    }
}

export const fetchArticles = (token) => {
    return {
        type: actionTypes.FETCH_ARTICLES,
        token: token
    }
}

export const fetchArticleById = (token, id) => {
    return {
        type: actionTypes.FETCH_ARTICLE_BY_ID,
        id: id,
        token: token
    }
}

export const fetchArticleByIdSuccess = (article) => {
    return {
        type: actionTypes.FETCH_ARTICLE_BY_ID_SUCCESS,
        article: article
    }
}
