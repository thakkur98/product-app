import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import reducer from "./Reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./Saga";

const rootReducer = combineReducers({
  product: reducer, 
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
