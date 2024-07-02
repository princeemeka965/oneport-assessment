import {
  GET_QUOTE_DATA_REQUEST,
  GET_QUOTE_DATA_SUCCESS,
  GET_QUOTE_DATA_FAILURE,
  POST_QUOTE_DATA_REQUEST,
  POST_QUOTE_DATA_SUCCESS,
  POST_QUOTE_DATA_FAILURE,
  SAVE_PAYLOAD_SCHEMA,
} from "./actionTypes";

export const getQuoteDataRequest = (data: any) => ({
  type: GET_QUOTE_DATA_REQUEST,
  payload: data,
});

export const getQuoteDataSuccess = (data: any) => ({
  type: GET_QUOTE_DATA_SUCCESS,
  payload: data,
});

export const getQuoteDataFailure = (error: string) => ({
  type: GET_QUOTE_DATA_FAILURE,
  payload: error,
});

export const postQuoteRequest = (data: any) => ({
  type: POST_QUOTE_DATA_REQUEST,
  payload: data,
});

export const postQuoteSuccess = (data: any) => ({
  type: POST_QUOTE_DATA_SUCCESS,
  payload: data,
});

export const postQuoteDataFailure = (data: any) => ({
  type: POST_QUOTE_DATA_FAILURE,
  payload: data,
});

export const savePayloadSchema = (data: any) => ({
  type: SAVE_PAYLOAD_SCHEMA,
  payload: data,
});
