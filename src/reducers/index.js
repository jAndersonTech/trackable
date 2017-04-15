import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import TracksReducer from './tracks_reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  tracks: TracksReducer
});

export default rootReducer;
