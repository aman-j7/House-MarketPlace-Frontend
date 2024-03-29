import { ActionTypes } from "../constants/actionTypes";

export const getListings = (type) => {
  return {
    type: ActionTypes.GET_LISTINGS,
    payload: type,
  };
};

export const addListings = (data) => {
  return {
    type: ActionTypes.ADD_LISTINGS,
    payload: data,
  };
};

export const getListingsOffers = () => {
  return {
    type: ActionTypes.GET_LISTINGS_OFFER,
  };
};

export const setListings = (data) => {
  return {
    type: ActionTypes.SET_LISTINGS,
    payload: data,
  };
};

export const setError = (error) => {
  return {
    type: ActionTypes.SET_LISTING_ERROR,
    payload: error,
  };
};

export const unsetError = () => {
  return {
    type: ActionTypes.UNSET_LISTING_ERROR,
  };
};

export const unsetLoading = () => {
  return {
    type: ActionTypes.UNSET_LISTING_LOADING,
  };
};
export const setLoading = () => {
  return {
    type: ActionTypes.SET_LISTING_LOADING,
  };
};

export const getUserListing = (id) => {
  return {
    type: ActionTypes.GET_USER_LISTINGS,
    payload: id,
  };
};

export const deleteUserListing = (id) => {
  return {
    type: ActionTypes.DELETE_USER_LISTING,
    payload: id,
  };
};

export const updateListing = (id, data) => {
  return {
    type: ActionTypes.UPDATE_LISTING,
    payload: {
      id,
      data,
    },
  };
};
