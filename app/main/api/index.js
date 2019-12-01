import * as cut from './cut'
import * as app from './app'

function start() {
  console.log('\n[API] Starting initialize')
  cut.initialize()
  app.initialize()
}

export default {
  start,
}
