import { createAction } from 'redux-actions';

export default {
  setAudioEnabled: createAction('VIDEO_SETTINGS_SET_AUDIO_ENABLED', (enabled) => ({ enabled })),
  setBitrate: createAction('VIDEO_SETTINGS_SET_BITRATE', (bitrate) => ({ bitrate })),
}
