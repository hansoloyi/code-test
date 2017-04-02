import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/reducer';
import { persistStore, autoRehydrate } from 'redux-persist'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const middleware = applyMiddleware(thunk);

const store = createStore(reducer, undefined, compose(middleware), autoRehydrate());

persistStore(store)

export default store
