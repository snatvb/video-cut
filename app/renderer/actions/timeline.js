import { createAction } from 'redux-actions';

export default {
  setCurrentCursor: createAction('TIMELINE_SET_CURRENT_CURSOR', (position) => ({ position })),
  setStartCursor: createAction('TIMELINE_SET_START_CURSOR', (position) => ({ position })),
  setEndCursor: createAction('TIMELINE_SET_END_CURSOR', (position) => ({ position })),
}
