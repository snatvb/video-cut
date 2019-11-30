import * as R from 'ramda'
import { handleActions } from 'redux-actions';
import actions from '../actions/file';

const defaultState = { filesPath: [] }

export default handleActions(
  {
    [actions.add]: (state, action) => {
      return R.assoc(
        'filesPath',
        R.compose(R.uniq, R.append(action.payload.file.path))(state.items),
        state,
      )
    },
  },
  defaultState,
);
