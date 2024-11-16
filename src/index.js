import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import { bannerReducer } from "./reducers/bannerReducer";
import categoryReducer from "./reducers/categoryReducer";
import { galleryReducer } from "./reducers/galleryReducer";
import productReducer from "./reducers/productReducer";
import sellerReducer from "./reducers/sellerReducer";
import { offerBannerReducer } from "./reducers/offerBannerReducer";
import {
  commentCreateReducer,
  commentDeleteReducer,
  commentListReducer,
  commentUpdateReducer,
} from "./reducers/commentReducers";
import { cartReducer } from "./reducers/cartReducer";
import locationReducer from "./reducers/locationReducer";
import { codReducer, paymentReducer } from "./reducers/paymentReducer";
import { adminReducer } from "./reducers/adminReducer";
import { orderReducer } from "./reducers/orderReducer";
import searchReducer from "./reducers/searchReducer";
import chatReducer from "./reducers/chatReducer";
import taskReducer from "./reducers/taskReducer";
import { videoUploadReducer } from "./reducers/videoUploadReducer";
import courierReducer from "./reducers/courierReducers";
import vehicleTypeReducer from "./reducers/vehicleTypeReducer";
import deliveryManReducer from "./reducers/deliveryManReducers";
import { sellerOrderToCourierReducer } from "./reducers/sellerOrderToCourierReducer";

const rootReducer = combineReducers({
  commentCreate: commentCreateReducer,
  commentList: commentListReducer,
  commentUpdate: commentUpdateReducer,
  commentDelete: commentDeleteReducer,
  notifications: notificationReducer,
  sellerOrderToCourier: sellerOrderToCourierReducer,
  deliveryMan:deliveryManReducer,
  offerBanner: offerBannerReducer,
  videoUpload: videoUploadReducer,
  vehicleType: vehicleTypeReducer,
  courier: courierReducer,
  categories: categoryReducer,
  galleryItems: galleryReducer,
  location: locationReducer,
  payment: paymentReducer,
  product: productReducer,
  seller: sellerReducer,
  banner: bannerReducer,
  orders: orderReducer,
  search: searchReducer,
  tasks: taskReducer,
  chat: chatReducer,
  user: userReducer,
  cart: cartReducer,
  cod: codReducer,
  adminReducer,

});

export default rootReducer;
