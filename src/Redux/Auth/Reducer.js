import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from "./ActionTypes";

const initialState = {
  user: null,
  auth:false,
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state,auth:true, isLoading: false };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload }; // Updated: action.payload
    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload, error: null };
    case LOGOUT:
      localStorage.removeItem("jwt"); // Updated: Remove 'jwt' token
      return { ...state, user: null, auth:false,error: null }; // Removed: Removing 'wt' and 'wtt' tokens
    default:
      return state;
  }
};

export default authReducer;
