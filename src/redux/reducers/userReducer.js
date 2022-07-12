import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  id: "",
  name: "",
  userRef : "",
  token: "",
  error: null,
  loggedIn: false,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER_DETAILS:
      return { ...state, id: payload.id, name: payload.name, userRef: payload.userRef ,loggedIn : true };
    case ActionTypes.USER_LOGOUT:
      return (state = initialState);
    case ActionTypes.SET_USER_ERROR:
      return { ...state, error : payload };
      case ActionTypes.UNSET_USER_ERROR:
        return { ...state, error : null };
    default:
      return state;
  }
};
