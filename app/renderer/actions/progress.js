import { createAction } from 'redux-actions';

export default {
  setError: createAction('PROGRESS_SET_ERROR', (error) => ({ error })),
  setSuccess: createAction('PROGRESS_SET_SUCCESS', (success) => ({ success })),
  setPercents: createAction('PROGRESS_SET_PERCENTS', (percents) => ({ percents })),
  setInProgress: createAction('PROGRESS_IN_PROGRESS', (isProgress) => ({ isProgress })),
}
