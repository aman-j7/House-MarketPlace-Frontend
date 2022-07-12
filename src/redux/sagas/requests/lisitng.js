import axios from 'axios'

export function requestGetListing(action){
    return axios.get(`http://localhost:9012/getListings/${action.payload}`);
}

export function requestGetListingOffers(action){
    return axios.get('http://localhost:9012/getListingsOffers');
}

export function requestAddListing(action) {
    return axios.post("http://localhost:9012/addListing", {
      ...action.payload, 
    });
  }