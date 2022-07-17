import { call, put, takeLatest } from "redux-saga/effects";
import { setError, setListings } from "../../actions/listing";
import { ActionTypes } from "../../constants/actionTypes";
import {
  requestAddListing,
  requestDeleteUserListing,
  requestGetListing,
  requestGetListingOffers,
  requestGetUserListing,
  requestUpdateListing,
} from "../requests/lisitng";

function* handleGetListing(type) {
  try {
    const response = yield call(requestGetListing, type);
    if (response.data) yield put(setListings(response.data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* handleGetUserListings(action) {
  try {
    const response = yield call(requestGetUserListing, action);
    if (response.data) yield put(setListings(response.data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* handleAddListing(data) {
  try {
    yield call(requestAddListing, data);
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* handleUpdateListing(data) {
  try {
    yield call(requestUpdateListing, data);
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* handleDeleteUserListing(data) {
  try {
    yield call(requestDeleteUserListing, data);
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* handleGetListingOffers() {
  try {
    const response = yield call(requestGetListingOffers);
    if (response.data) yield put(setListings(response.data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

export function* watchGetListing() {
  yield takeLatest(ActionTypes.GET_LISTINGS, handleGetListing);
}

export function* watchGetListingOffers() {
  yield takeLatest(ActionTypes.GET_LISTINGS_OFFER, handleGetListingOffers);
}

export function* watchAddListing() {
  yield takeLatest(ActionTypes.ADD_LISTINGS, handleAddListing);
}

export function* watchGetUserListing() {
  yield takeLatest(ActionTypes.GET_USER_LISTINGS, handleGetUserListings);
}

export function* watchDeleteUserListing() {
  yield takeLatest(ActionTypes.DELETE_USER_LISTING, handleDeleteUserListing);
}

export function* watchUpdateListing() {
  yield takeLatest(ActionTypes.UPDATE_LISTING, handleUpdateListing);
}
