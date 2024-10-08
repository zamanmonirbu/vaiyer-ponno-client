import axiosInstance from "../api/axiosInstance";

// Add to cart action
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axiosInstance.get(`/api/products/${id}`); // Fetch product details

  dispatch({
    type: "ADD_TO_CART",
    payload: {
      product: data._id,
      name: data.name,
      imageURL: data.imageURL,
      unitPrice: data.unitPrice,
      offer:data.offer,
      description: data.description,
      stock: data.stock,   
      seller:data.seller,
      qty,
    },
  });

  // Save cart items to localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Fetch cart products action
export const getCartProducts = () => (dispatch) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  dispatch({
    type: "GET_CART_PRODUCTS",
    payload: cartItems,
  });
};



// Remove from cart action
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: "CLEAR_CART",
  });

  localStorage.removeItem("cartItems");
};
