import * as R from 'ramda'
import { handleActions } from 'redux-actions';
import actions from '../actions/file';

const defaultState = { path: undefined }

export default handleActions(
  {
    [actions.add]: (state, action) => {
      return R.assoc(
        'path',
        action.payload.file.path,
        state,
      )
    },
  },
  defaultState,
);
