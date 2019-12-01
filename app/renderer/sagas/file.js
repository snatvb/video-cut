import { take, all, call, select, put } from 'redux-saga/effects'
import { ipcRenderer } from 'electron'

import * as selectors from '../selectors'
import * as actions from '../actions'

function* save() {
  while (true) {
    const action = yield take('FILE_SAVE')
    const inProgress = yield select(selectors.progress.getInProgress)
    if (inProgress) { continue }

    yield put(actions.progress.setInProgress(true))
    const filePath = yield select(selectors.file.getPath)
    const time = action.payload
    ipcRenderer.send('video.cut', {
      time,
      filePath,
    })
  }
}

export function* initialize() {
  console.debug('File sagas initialize')
  yield all([
    call(save),
  ])
}
