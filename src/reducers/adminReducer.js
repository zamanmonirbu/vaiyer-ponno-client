export const adminRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case 'ADMIN_REGISTER_REQUEST':
        return { loading: true };
      case 'ADMIN_REGISTER_SUCCESS':
        return { loading: false, success: true };
      case 'ADMIN_REGISTER_FAIL':
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const adminLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case 'ADMIN_LOGIN_REQUEST':
        return { loading: true };
      case 'ADMIN_LOGIN_SUCCESS':
        return { loading: false, adminInfo: action.payload };
      case 'ADMIN_LOGIN_FAIL':
        return { loading: false, error: action.payload };
      case 'ADMIN_LOGOUT':
        return {};
      default:
        return state;
    }
  };
  