import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';
import { bannerReducer } from './reducers/bannerReducer';
import  categoryReducer  from './reducers/categoryReducer';
import { galleryReducer } from './reducers/galleryReducer';
import productReducer from './reducers/productReducer';
import { adminLoginReducer, adminRegisterReducer } from './reducers/adminReducer';
import { sellerLoginReducer, sellerRegisterReducer } from './reducers/sellerReducer';



const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationReducer,
  categories:categoryReducer,
  banner:bannerReducer,
  galleryItems:galleryReducer,
  product: productReducer,
  adminRegister:adminRegisterReducer,
  adminLogin:adminLoginReducer,
  sellerRegister:sellerRegisterReducer,
  sellerLogin:sellerLoginReducer,

  
});

export default rootReducer;
