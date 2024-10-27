const chatReducer = (state = { chatUsers: [], loading: false, error: false }, action) => {
    switch (action.type) {
            case "SAVE_USER":
                return ({...state, chatUsers: [...state.chatUsers, action.data]});
             default:
                return state
    }}
export default chatReducer


// import {
//     CREATE_CHAT_REQUEST,
//     CREATE_CHAT_SUCCESS,
//     CREATE_CHAT_FAIL,
//     FETCH_CHATS_REQUEST,
//     FETCH_CHATS_SUCCESS,
//     FETCH_CHATS_FAIL,
//     FIND_CHAT_REQUEST,
//     FIND_CHAT_SUCCESS,
//     FIND_CHAT_FAIL,
//   } from "../actions/actionTypes";
  
//   const initialState = {
//     chats: [],
//     currentChat: null,
//     loading: false,
//     error: null,
//   };
  
//   // The chatReducer will handle chat-related states
//   const chatReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case CREATE_CHAT_REQUEST:
//       case FETCH_CHATS_REQUEST:
//       case FIND_CHAT_REQUEST:
//         return {
//           ...state,
//           loading: true,
//         };
  
//       case CREATE_CHAT_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           currentChat: action.payload, // Store the newly created chat
//         };
  
//       case FETCH_CHATS_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           chats: action.payload, // Store the list of chats
//         };
  
//       case FIND_CHAT_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           currentChat: action.payload, // Store the found chat
//         };
  
//       case CREATE_CHAT_FAIL:
//       case FETCH_CHATS_FAIL:
//       case FIND_CHAT_FAIL:
//         return {
//           ...state,
//           loading: false,
//           error: action.payload, // Store the error message
//         };
  
//       default:
//         return state;
//     }
//   };
  
//   export default chatReducer;
  