import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { connectRouter, routerMiddleware, push } from 'connected-react-router'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import createSagaMiddleware from 'redux-saga'

import middlewares from './middlewares'
import * as sagas from './sagas'
import user from './reducers/user'
import userActions from './actions/user'
import file from './reducers/file'
import fileActions from './actions/file'
import progress from './reducers/progress'
import progressActions from './actions/progress'

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

  const enhancer = composeEnhancers(applyMiddleware(...middlewaresToApply), persistState())
  const rootReducer = combineReducers(reducers)
  const store = createStore(rootReducer, initialState, enhancer)
  sagaMiddleware.run(sagas.initialize)

  return store
}
