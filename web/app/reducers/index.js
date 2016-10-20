import { combineReducers } from "redux";

import { FULLY_CONNECTED_EVALUATED } from '../actions/EvaluateActions';

const initialState = {
  fully_connected: {}
};

const fullyConnected = (state = {}, action) => {
  switch (action.type) {
    case FULLY_CONNECTED_EVALUATED:
      return Object.assign({}, action.payload.results);
    default:
      return state;
  }
};

export default combineReducers({
  fully_connected: fullyConnected
})
