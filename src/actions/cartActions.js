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
      description: data.description,
      stock: data.stock,
      qty,
    },
  });

  // Save cart items to localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove from cart action
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
