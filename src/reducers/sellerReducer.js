export const sellerRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SELLER_REGISTER_REQUEST':
        return { loading: true };
      case 'SELLER_REGISTER_SUCCESS':
        return { loading: false, success: true };
      case 'SELLER_REGISTER_FAIL':
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const sellerLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SELLER_LOGIN_REQUEST':
        return { loading: true };
      case 'SELLER_LOGIN_SUCCESS':
        return { loading: false, sellerInfo: action.payload };
      case 'SELLER_LOGIN_FAIL':
        return { loading: false, error: action.payload };
      case 'SELLER_LOGOUT':
        return {};
      default:
        return state;
    }
  };
  