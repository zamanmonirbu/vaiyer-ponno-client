import axiosInstance from "../api/axiosInstance";
import { PAYMENT_REQUEST, PAYMENT_SUCCESS, PAYMENT_FAILURE } from "./actionTypes";

export const makePayment = (paymentData) => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_REQUEST });
    // console.log(paymentData)

    // Make the API call to the payment endpoint
    const {data} = await axiosInstance.post("/api/payment", paymentData);

    // On successful payment
    dispatch({
      type: PAYMENT_SUCCESS,
      payload: data, // This should include payment confirmation details
    });
    // console.log(data.GatewayPageURL)
    return data.GatewayPageURL;

  } catch (error) {
    dispatch({
      type: PAYMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
