import { put, call, takeLatest } from "redux-saga/effects";
import { API_ERROR, API_REQUEST, API_SUCCESS } from "./Constant";

const fetchData = async () =>{
   const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error("Failed to fetch products");
   const products = await res.json();
   return products;
} 

function* fetchSaga() {
  try {
    const data = yield call(fetchData);
    yield put({ type: API_SUCCESS, payload: data });
  } catch (error: any) {
    yield put({ type: API_ERROR, payload: error.message });
  }
}

function* rootSaga(){
    yield takeLatest(API_REQUEST,fetchSaga );
}

export default rootSaga;