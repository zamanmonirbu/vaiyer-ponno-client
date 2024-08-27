import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // for async actions
import rootReducer from './index';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
