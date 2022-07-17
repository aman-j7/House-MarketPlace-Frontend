import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  listing: [],
  loading: true,
  error: null,
};

export const listingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_LISTINGS:
      state = initialState;
      return { ...state, listing: payload, loading: false };
    case ActionTypes.SET_LISTING_ERROR:
      return { ...state, error: payload };
    case ActionTypes.UNSET_ERROR_LOADING:
      return { ...state, error: null };
    case ActionTypes.UNSET_LISTING_LOADING:
      return { ...state, loading: false };
    case ActionTypes.SET_LISTING_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
