import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';
import propleReducer from './reducers/propleReducer';

const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationReducer,
  prople:propleReducer
  
});

export default rootReducer;
