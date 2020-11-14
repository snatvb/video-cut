import { createAction } from 'redux-actions';

export default {
  save: createAction('FILE_SAVE', (videoElement) => ({ videoElement })),
  add: createAction('FILE_ADD', (file) => ({ file })),
  clear: createAction('FILE_CLEAR'),
}
