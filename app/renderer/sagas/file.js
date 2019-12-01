// import { call } from 'redux-saga'
import { take, all, call, select } from 'redux-saga/effects'
import { ipcRenderer } from 'electron'

import * as selectors from '../selectors'

function* save() {
  while (true) {
    const action = yield take('FILE_SAVE')
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
