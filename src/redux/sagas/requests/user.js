import axios from "axios";

export function requestGetUser(action) {
  return axios.post("https://house-marketplace-api.herokuapp.com/userAuthenticate", {
    id: action.payload.email,
    password: action.payload.password,
  });
}

export function requestAddUser(action) {
  return axios.post("https://house-marketplace-api.herokuapp.com/addUser", {
    name : action.payload.name,
    id: action.payload.email,
    password: action.payload.password,
    userRef: action.payload.userRef,
  });
}

export function requestUpdateUser(action) {
  const url ="https://house-marketplace-api.herokuapp.com/"+action.payload.curId;
  return axios.post(url, {
    name : action.payload.name,
    id: action.payload.email,
  });
}
