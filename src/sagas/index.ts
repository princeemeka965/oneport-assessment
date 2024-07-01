import {
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  GET_QUOTE_DATA_REQUEST,
  GET_QUOTE_DATA_SUCCESS,
  GET_QUOTE_DATA_FAILURE,
} from "../store/actionTypes";

interface FetchDataSuccessAction {
  type: typeof GET_QUOTE_DATA_SUCCESS;
  payload: any;
}

interface FetchDataFailureAction {
  type: typeof GET_QUOTE_DATA_FAILURE;
  payload: string;
}

type SagaReturnType<T> = Generator<
  | CallEffect<AxiosResponse<T>>
  | PutEffect<FetchDataSuccessAction | FetchDataFailureAction>,
  void,
  AxiosResponse<T>
>;

function* fetchDataSaga(action: any): SagaReturnType<any> {
  try {
    const response: AxiosResponse<any> = yield call(() =>
      axios.get<any>(
        `https://test-api.oneport365.com/api/admin/quotes/assessment/get?${action.payload}`
      )
    );
    yield put<FetchDataSuccessAction>({
      type: GET_QUOTE_DATA_SUCCESS,
      payload: response.data.data,
    });
  } catch (error: any) {
    yield put<FetchDataFailureAction>({
      type: GET_QUOTE_DATA_FAILURE,
      payload: error.message,
    });
  }
}

function* rootSaga() {
  yield takeLatest(GET_QUOTE_DATA_REQUEST, fetchDataSaga);
}

export default rootSaga;
