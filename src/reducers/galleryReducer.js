const initialState = {
    galleryItems: [],
    loading: false,
    error: null,
};

export const galleryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_GALLERY_ITEMS_SUCCESS':
            return { ...state, galleryItems: action.payload };
        case 'CREATE_GALLERY_ITEM_SUCCESS':
            return { ...state, galleryItems: [...state.galleryItems, action.payload] };
        case 'UPDATE_GALLERY_ITEM_SUCCESS':
            return {
                ...state,
                galleryItems: state.galleryItems.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                ),
            };
        case 'DELETE_GALLERY_ITEM_SUCCESS':
            return {
                ...state,
                galleryItems: state.galleryItems.filter((item) => item._id !== action.payload),
            };
        case 'FETCH_GALLERY_ITEMS_FAIL':
        case 'CREATE_GALLERY_ITEM_FAIL':
        case 'UPDATE_GALLERY_ITEM_FAIL':
        case 'DELETE_GALLERY_ITEM_FAIL':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
