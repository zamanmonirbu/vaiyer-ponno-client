import axiosInstance from "../api/axiosInstance";


export const getBanners = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('/api/banners');
        dispatch({ type: 'GET_BANNERS_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'GET_BANNERS_FAIL', payload: error.message });
    }
};

export const createBanner = (imageUrl) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post('/api/banners', { imageUrl });
        dispatch({ type: 'CREATE_BANNER_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'CREATE_BANNER_FAIL', payload: error.message });
    }
};

export const deleteBanner = (id) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/api/banners/${id}`);
        dispatch({ type: 'DELETE_BANNER_SUCCESS', payload: id });
    } catch (error) {
        dispatch({ type: 'DELETE_BANNER_FAIL', payload: error.message });
    }
};
