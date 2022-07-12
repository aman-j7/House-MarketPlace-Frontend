import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from './reducers/index'
import { watcherSaga } from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const store = createStore( reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga)

export default store;