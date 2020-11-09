import { ipcRenderer } from 'electron'

export const handleClose = () => (next) => (action) => {
  if (action.type === 'APP_CLOSE') {
    ipcRenderer.send('app.close')
  }

  return next(action)
}

export const middlewares = [
  handleClose,
]
