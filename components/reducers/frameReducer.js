const generateTranslation = () => {
  return { x: Math.random() * 10 - 5 + '%', y: Math.random() * 10 - 5 + '%' };
};

export const handleAddFrame = (dispatch) => {
  dispatch({
    type: 'addFrame',
  });
};

export const handleRemoveFrame = (dispatch) => {
  dispatch({
    type: 'removeFrame',
  });
};

export const frameReducer = (state, action) => {
  switch (action.type) {
    case 'addFrame':
      return { frames: [generateTranslation(), ...state.frames] };
    case 'removeFrame':
        return { frames: state.frames.splice(-1)}
    default:
      return state;
  }
};
