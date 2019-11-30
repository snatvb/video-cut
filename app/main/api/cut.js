import { ipcMain } from 'electron'

function cut(event, args) {
  console.log('cut', event, args)
}

function registerListeners() {
  ipcMain.on('video.cut', cut)
}

export function initialize() {
  registerListeners()
  console.log('Cut initialized')
}
