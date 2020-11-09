import { handleActions } from 'redux-actions'
import { Position } from '../../shared/constants/watermark'
import actions from '../actions/watermark'

export const defaultState = { filePath: null, position: Position.BottomRight }

export default handleActions(
  {
    [actions.clear]: () => defaultState,
    [actions.update]: (_, action) => action.payload.watermark,
  },
  defaultState,
)
