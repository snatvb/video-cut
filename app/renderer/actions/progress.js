import { createAction } from 'redux-actions';

export default {
  merge: createAction('PROGRESS_MERGE', (state) => ({ state })),
  setError: createAction('PROGRESS_SET_ERROR', (error) => ({ error })),
  setSuccess: createAction('PROGRESS_SET_SUCCESS', (success) => ({ success })),
  setPercents: createAction('PROGRESS_SET_PERCENTS', (percent) => ({ percent })),
  setInProgress: createAction('PROGRESS_IN_PROGRESS', (isProgress) => ({ isProgress })),
}
