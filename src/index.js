import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';
import { bannerReducer } from './reducers/bannerReducer';
import  categoryReducer  from './reducers/categoryReducer';
import { galleryReducer } from './reducers/galleryReducer';
import productReducer from './reducers/productReducer';
import { adminCreateReducer, adminDeleteReducer, adminLoginReducer, adminReadReducer, adminRegisterReducer, adminRequestsReducer, adminUpdateReducer } from './reducers/adminReducer';
import sellerReducer from './reducers/sellerReducer';



const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationReducer,
  categories:categoryReducer,
  banner:bannerReducer,
  galleryItems:galleryReducer,
  product: productReducer,
  adminRegister:adminRegisterReducer,
  adminLogin:adminLoginReducer,
  seller: sellerReducer,
  adminCreateReducer,
  adminReadReducer,
  adminUpdateReducer,
  adminDeleteReducer,
  adminRequests: adminRequestsReducer,
});

export default rootReducer;
