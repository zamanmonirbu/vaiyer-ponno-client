import axiosInstance from "../api/axiosInstance";


export const fetchGalleryItems = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('/api/gallery');
        dispatch({ type: 'FETCH_GALLERY_ITEMS_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'FETCH_GALLERY_ITEMS_FAIL', payload: error.message });
    }
};

export const createGalleryItem = (item) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post('/api/gallery', item);
        dispatch({ type: 'CREATE_GALLERY_ITEM_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'CREATE_GALLERY_ITEM_FAIL', payload: error.message });
    }
};

export const updateGalleryItem = (id, item) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.put(`/api/gallery/${id}`, item);
        dispatch({ type: 'UPDATE_GALLERY_ITEM_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'UPDATE_GALLERY_ITEM_FAIL', payload: error.message });
    }
};

export const deleteGalleryItem = (id) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/api/gallery/${id}`);
        dispatch({ type: 'DELETE_GALLERY_ITEM_SUCCESS', payload: id });
    } catch (error) {
        dispatch({ type: 'DELETE_GALLERY_ITEM_FAIL', payload: error.message });
    }
};
