import { createAction } from 'redux-actions';

export default {
  setCursorPosition: createAction('TIMELINE_SET_CURSOR_POSITION', (cursorPosition) => ({ cursorPosition })),
  setStartTime: createAction('TIMELINE_SET_START_TIME', (time) => ({ time })),
  setEndTime: createAction('TIMELINE_SET_END_TIME', (time) => ({ time })),
}
