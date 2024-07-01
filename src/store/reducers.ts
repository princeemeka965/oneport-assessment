const initialState = {
  quoteData: null,
  error: null,
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET_QUOTE_DATA_REQUEST":
      return { ...state, loading: true, error: null };
    case "GET_QUOTE_DATA_SUCCESS":
      return { ...state, quoteData: action.payload, loading: false };
    case "GET_QUOTE_DATA_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
