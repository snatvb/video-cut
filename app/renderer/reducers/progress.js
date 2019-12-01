import * as R from 'ramda'
import { handleActions } from 'redux-actions'
import actions from '../actions/progress'

const defaultState = { inProgress: false, percents: 0, error: undefined, success: false }

export default handleActions(
  {
    [actions.setError]: (state, action) => R.assoc('error', action.payload.error, state),
    [actions.setSuccess]: (state, action) => R.assoc('error', action.payload.success, state),
    [actions.setPercents]: (state, action) => R.assoc('percents', action.payload.percents, state),
    [actions.setInProgress]: (state, action) => R.assoc('inProgress', action.payload.inProgress, state),
  },
  defaultState,
)
