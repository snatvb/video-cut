import { ipcRenderer } from 'electron'
import { all, call, put, select, take } from 'redux-saga/effects'
import * as actions from '../actions'
import * as selectors from '../selectors'


function* save() {
  while (true) {
    const action = yield take('FILE_SAVE')
    const inProgress = yield select(selectors.progress.getInProgress)
    if (inProgress) { continue }

    yield put(actions.progress.setInProgress(true))
    const filePath = yield select(selectors.file.getPath)
    const watermark = yield select(selectors.watermark.get)
    const videoSettings = yield select(selectors.videoSettings.get)
    const time = action.payload
    ipcRenderer.send('video.cut', {
      time,
      filePath,
      watermark,
      audio: videoSettings.audio,
      bitrate: videoSettings.bitrate,
    })
  }
}

export function* initialize() {
  console.debug('File sagas initialize')
  yield all([
    call(save),
  ])
}
