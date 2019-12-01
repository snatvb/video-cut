import path from 'path'
import { dialog } from 'electron'
import { ipcMain } from 'electron'
import ffmpeg from 'fluent-ffmpeg'

async function getPathToSave(filePath) {
  const originalExt = path.extname(filePath)
  const pathToSave = await dialog.showSaveDialog({ defaultPath: path.dirname(filePath) })
  if (pathToSave.canceled, path.basename(pathToSave.filePath).length === 0) {
    return {
      cancelled: true,
    }
  }
  const extToSave = path.extname(pathToSave.filePath)
  return extToSave === originalExt ? {
    filePath: path.normalize(pathToSave.filePath),
    cancelled: false,
  } : {
    filePath: path.normalize(`${pathToSave.filePath}${originalExt}`),
    cancelled: false,
  }
}

async function cut(event, { filePath, time }) {
  console.log('Start cut', { filePath, time })
  const pathToSave = await getPathToSave(filePath)
  console.log('Path to save', pathToSave)
  if (pathToSave.cancelled) {
    console.log('Save was cancelled')
    event.sender.send('video.cut.cancelled')
    return
  }

  ffmpeg(filePath)
  .setStartTime(time.start)
  .duration(time.end)
  .on('end', function(error) {
    if(!error) {
      console.log('Save success')
      event.sender.send('video.progress.success', { success: true })
    } else {
      event.sender.send('video.progress.error', { error })
    }
  })
  .on('error', function(error) {
    console.log('Error: ', error)
    event.sender.send('video.progress.error', { error })
  })
  .on('progress', function(progress) {
    event.sender.send('video.progress', { percent: progress.percent })
  })
  .save(path.normalize(pathToSave.filePath))
}

function registerListeners() {
  ipcMain.on('video.cut', cut)
}

export function initialize() {
  registerListeners()
  console.log('[API] Cut initialized')
}
