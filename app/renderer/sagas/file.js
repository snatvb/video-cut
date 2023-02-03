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
    const [filePath, watermark, videoSettings, startCursor, endCursor] = yield all([
      select(selectors.file.getPath),
      select(selectors.watermark.get),
      select(selectors.videoSettings.get),
      select(selectors.timeline.getStartCursor),
      select(selectors.timeline.getEndCursor),
    ])
    const { videoElement } = action.payload
    const start = startCursor
      .map((x) => (x / 100) * videoElement.duration)
      .map(Math.floor)
      .getOrElse(0)
    const end = endCursor.map((x) => (x / 100) * videoElement.duration)
      .map(Math.floor)
      .getOrElse(videoElement.duration)
    const time = {
      start,
      end,
    }
    const args = {
      time,
      filePath,
      watermark,
      audio: videoSettings.audio,
      bitrate: videoSettings.bitrate,
    }

    yield put(actions.progress.setPercents(0.1))
    console.log('Отправка на рендер', args)
    ipcRenderer.send('video.cut', args)
  }
}

export function* initialize() {
  console.debug('File sagas initialize')
  yield all([
    call(save),
  ])
}
