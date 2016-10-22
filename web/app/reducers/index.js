import { combineReducers } from "redux";

import { FULLY_CONNECTED_EVALUATED } from '../actions/EvaluateActions';
import { INPUT_UPDATED, INPUT_CLEARED } from '../actions/InputActions';

const initialState = {
  fully_connected: {},
  input_image: { data: [], size: 0 }
};

const fullyConnected = (state = {}, action) => {
  switch (action.type) {
    case FULLY_CONNECTED_EVALUATED:
      return Object.assign({}, action.payload.results);
    default:
      return state;
  }
};

const inputUpdated = (state = {}, action) => {
  switch (action.type) {
    case INPUT_UPDATED:
      return Object.assign({}, action.payload);
    case INPUT_CLEARED:
      return Object.assign({}, { data: [], size: 0 });
    default:
      return state;
  }
};

export default combineReducers({
  fully_connected: fullyConnected,
  input_image: inputUpdated
})
