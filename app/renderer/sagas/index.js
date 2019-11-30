import { all, call } from 'redux-saga/effects'

import * as file from './file'

export function* initialize() {
  yield all([
    call(file.initialize),
  ])
}
