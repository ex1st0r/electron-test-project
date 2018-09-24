import { Dispatch } from 'redux'

import { common as commonUtils } from '../../utils'
import * as actions from './actions'

export const setRandomColor = () => (dispatch: Dispatch) => {
  const color = commonUtils.getRandomColor()
  
  dispatch(actions.setColor(color))
}
