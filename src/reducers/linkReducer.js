import { ActionTypes } from '../actions';

const LinkReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SUBMIT_LINKS:
      return action.payload;
    default:
      return {};
  }
};

export default LinkReducer;
