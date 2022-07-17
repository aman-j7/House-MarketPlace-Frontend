import { all } from "redux-saga/effects";
import {
  watchAddListing,
  watchDeleteUserListing,
  watchGetListing,
  watchGetListingOffers,
  watchGetUserListing,
  watchUpdateListing,
} from "./handlers/listing";
import { watchGetUser, watchAddUser, watchUpdateUser } from "./handlers/user";

export function* watcherSaga() {
  yield all([
    watchGetUser(),
    watchAddUser(),
    watchUpdateUser(),
    watchGetListing(),
    watchGetListingOffers(),
    watchAddListing(),
    watchGetUserListing(),
    watchDeleteUserListing(),
    watchUpdateListing(),
  ]);
}
