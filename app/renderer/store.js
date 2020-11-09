import { connectRouter, push, routerMiddleware } from 'connected-react-router'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import persistState from 'redux-localstorage'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import fileActions from './actions/file'
import progressActions from './actions/progress'
import userActions from './actions/user'
import middlewares from './middlewares'
import file from './reducers/file'
import progress from './reducers/progress'
import user from './reducers/user'
import videoSettings from './reducers/videoSettings'
import watermark from './reducers/watermark'
import * as sagas from './sagas'


export default function configureStore(initialState, routerHistory) {
  const router = routerMiddleware(routerHistory)

  const actionCreators = {
    ...progressActions,
    ...userActions,
    ...fileActions,
    push,
  }

  const reducers = {
    router: connectRouter(routerHistory),
    videoSettings,
    watermark,
    progress,
    user,
    file,
  }

  const sagaMiddleware = createSagaMiddleware()
  const middlewaresToApply = [thunk, router, ...middlewares, sagaMiddleware]

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators })
    }
    return compose
  })()

  const enhancer = composeEnhancers(applyMiddleware(...middlewaresToApply), persistState(
    Object.keys(reducers)
      .filter((path) => path !== 'progress')
  ))
  const rootReducer = combineReducers(reducers)
  const store = createStore(rootReducer, initialState, enhancer)
  sagaMiddleware.run(sagas.initialize)

  return store
}
