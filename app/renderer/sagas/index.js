import { all, call } from 'redux-saga/effects'

import * as file from './file'
import * as progress from './progress'

export function* initialize() {
  yield all([
    call(file.initialize),
    call(progress.initialize),
  ])
}
