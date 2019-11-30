import { createAction } from 'redux-actions';

export default {
  add: createAction('FILE_ADD', (file) => ({ file })),
}
