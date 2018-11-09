import { loadingBarReducer } from 'react-redux-loading'
import { combineReducers } from 'redux'
import user from '../reducers/user'

export default combineReducers({
  user,
  loadingBar: loadingBarReducer,
})