import { createAction } from 'redux-actions';

export default {
  save: createAction('FILE_SAVE', (start, end) => ({ start, end })),
  add: createAction('FILE_ADD', (file) => ({ file })),
  clear: createAction('FILE_CLEAR'),
}
