import { combineReducers } from "redux";

import { FULLY_CONNECTED_EVALUATED, CONVOLUTIONAL_EVALUATED } from '../actions/EvaluateActions';
import { INPUT_UPDATED, INPUT_CLEARED, RESCALED_INPUT_UPDATED } from '../actions/InputActions';

const initialState = {
  fully_connected: {},
  convolutional: {},
  input_image: { data: [], size: 0 },
  rescaled_input: null
};

const fullyConnected = (state = {}, action) => {
  switch (action.type) {
    case FULLY_CONNECTED_EVALUATED:
      return Object.assign({}, action.payload);
    case INPUT_CLEARED:
      return {};
    default:
      return state;
  }
};

const convolutional = (state = {}, action) => {
  switch (action.type) {
    case CONVOLUTIONAL_EVALUATED:
      return Object.assign({}, action.payload);
    case INPUT_CLEARED:
        return {};
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

const rescaledInput = (state = null, action) => {
  switch (action.type) {
    case RESCALED_INPUT_UPDATED:
      return action.payload;
    case INPUT_CLEARED:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  convolutional: convolutional,
  fully_connected: fullyConnected,
  input_image: inputUpdated,
  rescaled_input: rescaledInput
})
