import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { setUser, userError } from "../../actions/userActions";
import { ActionTypes } from "../../constants/actionTypes";
import {
  requestGetUser,
  requestAddUser,
  requestUpdateUser,
} from "../requests/user";

function* handleGetUser(action) {
  try {
    const response = yield call(requestGetUser, action);
    if (response.data) {
      yield put(setUser(response.data));
    } else {
      throw new Error("No User Exist");
    }
  } catch (error) {
    yield put(userError(error.message));
  }
}

function* handleAddUser(action) {
  try {
    const response = yield call(requestAddUser, action);
    if (response.status !== 200) {
      throw Error("Oops Something Went Wrong");
    }
  } catch (error) {
    yield put(userError(error.message));
  }
}

function* handleUpdateUser(action) {
  try {
    const response =yield call(requestUpdateUser, action);
    if(response.data){
      yield put(setUser(response.data));
    }
  } catch (error) {
    yield put(userError(error.message));
  }
}

export function* watchGetUser() {
  yield takeLatest(ActionTypes.GET_USER_DETAILS, handleGetUser);
}

export function* watchAddUser() {
  yield takeEvery(ActionTypes.ADD_USER_DETAILS, handleAddUser);
}

export function* watchUpdateUser() {
  yield takeLatest(ActionTypes.UPDATE_USER_DETAILS, handleUpdateUser);
}
