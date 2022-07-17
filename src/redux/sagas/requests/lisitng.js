import axios from "axios";

export function requestGetListing(action) {
  return axios.get(`https://house-marketplace-api.herokuapp.com/getListings/${action.payload}`);
}

export function requestGetListingOffers() {
  return axios.get("https://house-marketplace-api.herokuapp.com/getListingsOffers");
}

export function requestAddListing(action) {
  return axios.post("https://house-marketplace-api.herokuapp.com/addListing", {
    ...action.payload,
  });
}

export function requestGetUserListing(action) {
  return axios.get(`https://house-marketplace-api.herokuapp.com/getUserListings/${action.payload}`);
}

export function requestDeleteUserListing(action) {
  return axios.delete(`https://house-marketplace-api.herokuapp.com/deleteListing/${action.payload}`);
}

export function requestUpdateListing(action) {
  return axios.put(`https://house-marketplace-api.herokuapp.com/${action.payload.id}`,{
    ...action.payload.data,
  });
}