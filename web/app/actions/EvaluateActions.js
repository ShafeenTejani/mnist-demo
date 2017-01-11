//Copyright (c) 2016-2017 Shafeen Tejani. Released under GPLv3.
import { ajax } from 'nanoajax';
import fetch from 'whatwg-fetch';

export const FULLY_CONNECTED_EVALUATED = 'FULLY_CONNECTED_EVALUATED';
export const CONVOLUTIONAL_EVALUATED = 'CONVOLUTIONAL_EVALUATED';

export function evaluate(input) {
  return (dispatch) => {
    ajax({
      url: '/api/mnist/evaluate',
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}, function(code, responseText) {
        const response = JSON.parse(responseText);
        dispatch({ type: FULLY_CONNECTED_EVALUATED, payload: response.fully_connected });
        dispatch({ type: CONVOLUTIONAL_EVALUATED, payload: response.convolutional });
      }
    );
  }
}

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
        dispatch({ type: FULLY_CONNECTED_EVALUATED, payload: JSON.parse(responseText).results})
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
        dispatch({ type: CONVOLUTIONAL_EVALUATED, payload: JSON.parse(responseText).results})
      }
    );
  }
}
