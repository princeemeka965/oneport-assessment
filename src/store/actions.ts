import {
  GET_QUOTE_DATA_REQUEST,
  GET_QUOTE_DATA_SUCCESS,
  GET_QUOTE_DATA_FAILURE,
} from "./actionTypes";

export const getQuoteDataRequest = (data: any) => ({
  type: GET_QUOTE_DATA_REQUEST,
  payload: data,
});

export const getQuoteDataSuccess = (data: any) => ({
  type: GET_QUOTE_DATA_SUCCESS,
  payload: data,
});

export const getDataFailure = (error: string) => ({
  type: GET_QUOTE_DATA_FAILURE,
  payload: error,
});
