import { Action } from 'redux'

export const SET_COLOR = 'main/SET_COLOR'

export const setColor = (color: string) => ({
  type: SET_COLOR,
  payload: color,
})

