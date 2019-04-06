import { combineReducers } from 'redux';
import LinkReducer from './linkReducer';

const rootReducer = combineReducers({
  links: LinkReducer,
});

export default rootReducer;
