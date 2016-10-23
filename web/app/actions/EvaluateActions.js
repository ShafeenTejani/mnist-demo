import { ajax } from 'nanoajax';
import fetch from 'whatwg-fetch';

export const FULLY_CONNECTED_EVALUATED = 'FULLY_CONNECTED_EVALUATED';
export const CONVOLUTIONAL_EVALUATED = 'CONVOLUTIONAL_EVALUATED';

//const input = Array.apply(null, Array(784)).map(Number.prototype.valueOf,0);

export function evaluateFullyConnected(input) {
  return (dispatch) => {
    ajax({
      url: '/api/mnist/fully_connected',
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}, function(code, responseText) {
        dispatch({ type: FULLY_CONNECTED_EVALUATED, payload: JSON.parse(responseText)})
      }
    );
  }
};


export function evaluateConvolutional(input) {
  return (dispatch) => {
    ajax({
      url: '/api/mnist/convolutional',
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}, function(code, responseText) {
        dispatch({ type: CONVOLUTIONAL_EVALUATED, payload: JSON.parse(responseText)})
      }
    );
  }
}
