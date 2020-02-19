import { createStore, compose, combineReducers } from 'redux';
import { appReducer } from '../ducks';

const reducer = combineReducers({
  appReducer
});

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducer, composeEnhancers());

export default store;
