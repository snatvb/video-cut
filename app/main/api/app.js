import { ipcMain, app } from 'electron'

export function close() {
  app.quit()
}

export function initialize() {
  ipcMain.on('app.close', close)
  console.log('[API] App initialized')
}
