import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AuthReducer from './store/reducers/auth';
import ArticlesReducer from './store/reducers/articles';
import {
    watchAuth,
    watchArticles
} from './store/sagas/index';

//create combine reducer
const rootReducer = combineReducers({
    auth: AuthReducer,
    articles: ArticlesReducer
});

//check compoese
const composeEnhancers = compose;

//create sagamiddleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)))

//run saga
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchArticles);


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
