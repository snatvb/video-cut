import { eventChannel } from 'redux-saga'
import { take, all, call, put, delay } from 'redux-saga/effects'
import { ipcRenderer } from 'electron'

import * as actions from '../actions'
import { defaultState } from '../reducers/progress'

const TIME_TO_SHOW_TEXT = 2500

function makeChannel() {
  return eventChannel((emit) => {
      const handleProgress = (event, { percent }) => { emit({
        type: 'PROGRESS',
        payload: { percent },
      }) }

      const handleError = (event, { error }) => { emit({
        type: 'ERROR',
        payload: { error },
      }) }

      const handleSuccess = () => { emit({
        type: 'SUCCESS',
      }) }

      const handleCancelledCut = () => { emit({
        type: 'CANCELLED_CUT',
      }) }

      ipcRenderer.on('video.progress', handleProgress)
      ipcRenderer.on('video.progress.error', handleError)
      ipcRenderer.on('video.cut.cancelled', handleCancelledCut)
      ipcRenderer.on('video.progress.success', handleSuccess)

      return () => {
        ipcRenderer.removeListener('video.progress', handleProgress)
        ipcRenderer.removeListener('video.progress.error', handleError)
        ipcRenderer.removeListener('video.progress.success', handleSuccess)
      }
    }
  )
}

function* handleProgress(action) {
  yield put(actions.progress.setPercents(action.payload.percent))
}

function* handleError(action) {
  console.log(action.payload.error)
  yield put(actions.progress.setError('Error in progress (look to the console)'))
  yield delay(TIME_TO_SHOW_TEXT)
  yield put(actions.progress.merge(defaultState))
}

function* handleSuccess() {
  yield put(actions.progress.setPercents(100))
  yield delay(TIME_TO_SHOW_TEXT / 10)
  yield put(actions.progress.setSuccess(true))
  yield delay(TIME_TO_SHOW_TEXT)
  yield put(actions.progress.merge(defaultState))
}

function* handleCancelledCut() {
  yield put(actions.progress.merge(defaultState))
}

function* subscribe() {
  const channel = yield call(makeChannel)
  while (true) {
    const action = yield take(channel)
    switch (action.type) {
      case 'PROGRESS':
        yield call(handleProgress, action)
        break

      case 'ERROR':
        yield call(handleError, action)
        break

      case 'SUCCESS':
        yield call(handleSuccess, action)
        break

      case 'CANCELLED_CUT':
        yield call(handleCancelledCut, action)
        break

      default:
        break
    }
  }
}

export function* initialize() {
  console.debug('Progress sagas initialize')
  yield all([
    call(subscribe),
  ])
}
