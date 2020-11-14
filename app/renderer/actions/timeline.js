import { createAction } from 'redux-actions';

export default {
  setStartCursor: createAction('TIMELINE_SET_START_CURSOR', (position) => ({ position })),
  setEndCursor: createAction('TIMELINE_SET_END_CURSOR', (position) => ({ position })),
}
