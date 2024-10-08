export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case "GET_CART_PRODUCTS":
      return {
        ...state,
        cartItems: action.payload,
      };

    case "CLEAR_CART": // Handle clearing the cart
      return {
        ...state,
        cartItems: [], // Clear all cart items
      };

    default:
      return state;
  }
};
