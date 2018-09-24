import { combineReducers } from 'redux'
import main, {MainState} from './main/reducer'

export default combineReducers({
  main,
})


export interface IState {
  main: MainState
}
