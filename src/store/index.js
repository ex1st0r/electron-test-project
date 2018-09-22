import { combineReducers } from 'redux'
import rutube from './rutube/reducer'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  rutube,
  routing: routerReducer
})
