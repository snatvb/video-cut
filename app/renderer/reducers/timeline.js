import * as R from 'ramda'
import { handleActions } from 'redux-actions'
import actions from '../actions/timeline'

export const defaultState = {
  startCursor: null,
  endCursor: null,
}

export default handleActions(
  {
    [actions.setStartCursor]: (state, action) => R.assoc('startCursor', action.payload.position, state),
    [actions.setEndCursor]: (state, action) => R.assoc('endCursor', action.payload.position, state),
  },
  defaultState,
)
