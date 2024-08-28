const initialState = {
    banners: [],
    loading: false,
    error: null,
};

export const bannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BANNERS_SUCCESS':
            return { ...state, banners: action.payload, loading: false };
        case 'GET_BANNERS_FAIL':
            return { ...state, error: action.payload, loading: false };
        case 'CREATE_BANNER_SUCCESS':
            return { ...state, banners: [...state.banners, action.payload], loading: false };
        case 'CREATE_BANNER_FAIL':
            return { ...state, error: action.payload, loading: false };
        case 'DELETE_BANNER_SUCCESS':
            return { ...state, banners: state.banners.filter(banner => banner._id !== action.payload), loading: false };
        case 'DELETE_BANNER_FAIL':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};
