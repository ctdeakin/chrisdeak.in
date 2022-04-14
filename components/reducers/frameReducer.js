export const handleAddFrame = (dispatch) => {
  dispatch({
    type: 'addFrame',
  });
};

export const frameReducer = (state, action) => {
  switch (action.type) {
    case 'addFrame':
      return { frames: state.frames + 1 };
    default:
      return state;
  }
};
