import axios from "axios";

export function requestGetUser(action) {
  return axios.post("http://localhost:9012/userAuthenticate", {
    id: action.payload.email,
    password: action.payload.password,
  });
}

export function requestAddUser(action) {
  return axios.post("http://localhost:9012/addUser", {
    name : action.payload.name,
    id: action.payload.email,
    password: action.payload.password,
    userRef: action.payload.userRef,
  });
}

export function requestUpdateUser(action) {
  const url ="http://localhost:9012/updateUser/"+action.payload.curId;
  return axios.post(url, {
    name : action.payload.name,
    id: action.payload.email,
  });
}
