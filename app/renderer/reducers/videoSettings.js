import * as R from 'ramda'
import { handleActions } from 'redux-actions'
import actions from '../actions/videoSettings'

export const defaultState = { audio: { enabled: true }, bitrate: undefined }

export default handleActions(
  {
    [actions.setAudioEnabled]: (state, action) => R.assocPath(['audio', 'enabled'], action.payload.enabled, state),
    [actions.setBitrate]: (state, action) => ({ ...state, bitrate: action.payload.bitrate }),
  },
  defaultState,
)
