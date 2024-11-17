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
import { sellerOrderToCourierReducer } from "./reducers/sellerOrderToCourierReducer";
import deliveryManReducer from "./reducers/courierToDeliveryManReducer";




const rootReducer = combineReducers({
  sellerOrderToCourier: sellerOrderToCourierReducer,
  // courierToDeliveryMan: courierToDeliveryManReducer,
  commentUpdate: commentUpdateReducer,
  commentDelete: commentDeleteReducer,
  commentCreate: commentCreateReducer,
  notifications: notificationReducer,
  commentList: commentListReducer,
  deliveryMan: deliveryManReducer,
  offerBanner: offerBannerReducer,
  videoUpload: videoUploadReducer,
  vehicleType: vehicleTypeReducer,
  categories: categoryReducer,
  galleryItems: galleryReducer,
  location: locationReducer,
  courier: courierReducer,
  payment: paymentReducer,
  product: productReducer,
  seller: sellerReducer,
  banner: bannerReducer,
  search: searchReducer,
  orders: orderReducer,
  tasks: taskReducer,
  chat: chatReducer,
  user: userReducer,
  cart: cartReducer,
  cod: codReducer,
  adminReducer,
});

export default rootReducer;
