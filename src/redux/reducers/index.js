import {combineReducers} from 'redux';
import { userReducer } from './userReducer';
import {listingReducer} from './listingReducer';

const reducer = combineReducers({
    userReducer,
    listingReducer,
})

export default reducer

