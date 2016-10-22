export const INPUT_UPDATED = 'INPUT_UPDATED';
export const INPUT_CLEARED = 'INPUT_CLEARED';

export function inputUpdated(imageData, size) {
  return (dispatch) => {
    dispatch({ type: INPUT_UPDATED, payload: { data: imageData, size: size}});
  }
};

export function inputCleared() {
  return (dispatch) => {
    dispatch({ type: INPUT_CLEARED, payload: { }});
  }
};
