import { Action } from 'redux'
import * as actions from './actions'

const initialState: MainState = {
  color: null,
}

export default function main(state: MainState = initialState, action: IAction) {
  switch (action.type) {
    case actions.SET_COLOR:
      return {
        ...state,
        color: action.payload,
      }
    default:
      return state
  }
}

export interface MainState {
  color: string
}

export interface IAction extends Action {
  type: string
  payload: any
}
