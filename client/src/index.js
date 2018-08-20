import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import recipesReducer from './reducers/recipes';
import recipeInfoReducer from './reducers/recipeInfo';

import App from './app';
import './index.css';

const rootReducer = combineReducers({
    recipes: recipesReducer,
    recipeInfo: recipeInfoReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);