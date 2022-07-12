import { all} from 'redux-saga/effects';
import { watchAddListing, watchGetListing, watchGetListingOffers } from './handlers/listing';
import { watchGetUser,watchAddUser, watchUpdateUser} from './handlers/user';

export function* watcherSaga(){
    yield all([
        watchGetUser(),
        watchAddUser(),
        watchUpdateUser(),
        watchGetListing(),
        watchGetListingOffers(),
        watchAddListing(),
    ]);
}