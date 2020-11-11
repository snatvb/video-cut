import * as R from 'ramda'
import { handleActions } from 'redux-actions'
import actions from '../actions/timeline'

export const defaultState = {
  cursorPosition: 0,
  startTime: null,
  endTime: null,
}

export default handleActions(
  {
    [actions.setCursorPosition]: (state, action) => R.assoc('cursorPosition', action.payload.cursorPosition, state),
    [actions.setStartTime]: (state, action) => R.assoc('startTime', action.payload.time, state),
    [actions.setEndTime]: (state, action) => R.assoc('endTime', action.payload.time, state),
  },
  defaultState,
)
