import axiosInstance from "../api/axiosInstance";
import { PAYMENT_REQUEST, PAYMENT_SUCCESS, PAYMENT_FAILURE ,COD_REQUEST, COD_SUCCESS, COD_FAILURE,COD_CLEAR} from "./actionTypes";

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
    console.log(error)
    dispatch({
      type: PAYMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const makeCodOrder = (codData) => async (dispatch) => {
  try {
    dispatch({ type: COD_REQUEST });

    // Send the COD data to the backend endpoint created for COD
    const response = await axiosInstance.post("/api/payment/cod", codData);

    console.log(response.data)

    dispatch({
      type: COD_SUCCESS,
      payload: response.data,
    });

    // toast.success("Order placed with Cash on Delivery!");

  } catch (error) {
    console.error("Error placing COD order:", error);

    dispatch({
      type: COD_FAILURE,
      payload: error.response?.data?.message || error.message,
    });

    // toast.error("Failed to place COD order.");
  }
};

// Clear payment and cart action
export const clearPayment = () => (dispatch) => {
  dispatch({ type: COD_CLEAR });
};

