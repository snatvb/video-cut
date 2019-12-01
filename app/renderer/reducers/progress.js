import * as R from 'ramda'
import { handleActions } from 'redux-actions'
import actions from '../actions/progress'

export const defaultState = { inProgress: false, percent: 0, error: undefined, success: false }

export default handleActions(
  {
    [actions.merge]: (state, action) => R.merge(state, action.payload.state),
    [actions.setError]: (state, action) => R.assoc('error', action.payload.error, state),
    [actions.setSuccess]: (state, action) => R.assoc('success', action.payload.success, state),
    [actions.setPercents]: (state, action) => R.assoc('percent', action.payload.percent, state),
    [actions.setInProgress]: (state, action) => R.assoc('inProgress', action.payload.inProgress, state),
  },
  defaultState,
)
