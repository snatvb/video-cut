import { createAction } from 'redux-actions';

export default {
  clear: createAction('WATERMARK_CLEAR', () => ({})),
  update: createAction('WATERMARK_UPDATE', (watermark) => ({ watermark })),
}
