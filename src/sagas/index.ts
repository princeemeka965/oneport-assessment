import {
  call,
  put,
  all,
  takeLatest,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  GET_QUOTE_DATA_REQUEST,
  GET_QUOTE_DATA_SUCCESS,
  GET_QUOTE_DATA_FAILURE,
  POST_QUOTE_DATA_REQUEST,
  POST_QUOTE_DATA_SUCCESS,
  POST_QUOTE_DATA_FAILURE,
} from "../store/actionTypes";
import { toast } from "react-toastify";

interface FetchQuoteDataSuccessAction {
  type: typeof GET_QUOTE_DATA_SUCCESS;
  payload: any;
}

interface PostQuoteSuccessAction {
  type: typeof POST_QUOTE_DATA_SUCCESS;
  payload: any;
}

interface FetchDataFailureAction {
  type: typeof GET_QUOTE_DATA_FAILURE;
  payload: string;
}

interface PostDataFailureAction {
  type: typeof POST_QUOTE_DATA_FAILURE;
  payload: string;
}

type SagaReturnType<T> = Generator<
  | CallEffect<AxiosResponse<T>>
  | PutEffect<
      | FetchQuoteDataSuccessAction
      | PostQuoteSuccessAction
      | FetchDataFailureAction
      | PostDataFailureAction
    >,
  void,
  AxiosResponse<T>
>;

function* fetchQuoteDataSaga(action: any): SagaReturnType<any> {
  try {
    const response: AxiosResponse<any> = yield call(() =>
      axios.get<any>(
        `https://test-api.oneport365.com/api/admin/quotes/assessment/get?${action.payload}`
      )
    );
    yield put<FetchQuoteDataSuccessAction>({
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

function* postQuoteSaga(action: any): SagaReturnType<any> {
  try {
    const response: AxiosResponse<any> = yield call(() =>
      axios.post<any>(
        `https://test-api.oneport365.com/api/admin/quotes/assessment/create`,
        action.payload
      )
    );
    yield put<PostQuoteSuccessAction>({
      type: POST_QUOTE_DATA_SUCCESS,
      payload: response.data.message,
    });
    toast.success("Quote saved successfully!");
  } catch (error: any) {
    yield put<FetchDataFailureAction>({
      type: GET_QUOTE_DATA_FAILURE,
      payload: error.message,
    });
    toast.error(error.response.data.message);
  }
}

function* rootSaga() {
  yield all([
    takeLatest(GET_QUOTE_DATA_REQUEST, fetchQuoteDataSaga),
    takeLatest(POST_QUOTE_DATA_REQUEST, postQuoteSaga),
  ]);
}

export default rootSaga;
