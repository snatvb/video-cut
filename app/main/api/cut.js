import { dialog, ipcMain } from 'electron'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import { Position } from '../../shared/constants/watermark'

const storage = new Map()

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

const defaultWatermarkPosition = 'main_w-overlay_w-30:main_h-overlay_h-20'
const watermarkPositions = {
  [Position.TopLeft]: '30:20',
  [Position.TopRight]: 'main_w-overlay_w-30:20',
  [Position.BottomLeft]: '30:main_h-overlay_h-20',
  [Position.BottomRight]: defaultWatermarkPosition,
}

async function cut(event, { filePath, time, watermark, audio, bitrate }) {

  console.log('Start cut', { filePath, time })
  const pathToSave = await getPathToSave(filePath)
  console.log('Path to save', pathToSave)
  if (pathToSave.cancelled) {
    console.log('Save was cancelled')
    event.sender.send('video.cut.cancelled')
    return
  }

  const video = ffmpeg(filePath)
    .videoCodec('libx264')
    .setStartTime(time.start)
    .duration(time.end - time.start)
    .on('end', function (error) {
      storage.delete(filePath)
      if (!error) {
        console.log('Save success')
        event.sender.send('video.progress.success', { success: true })
      } else {
        event.sender.send('video.progress.error', { error })
      }
    })
    .on('error', function (error) {
      console.log('Error: ', error)
      event.sender.send('video.progress.error', { error })
    })
    .on('progress', function (progress) {
      event.sender.send('video.progress', { percent: progress.percent })
    })

  if (['number' || 'string'].includes(typeof bitrate) && String(bitrate).length > 0) {
    console.log('Set bitrate', bitrate)
    video.videoBitrate(bitrate)
  }

  if (!audio.enabled) {
    video.noAudio()
  }

  if (watermark.filePath) {
    video
      .input(path.normalize(watermark.filePath))
      .complexFilter([
        `overlay=${watermarkPositions[watermark.position] || defaultWatermarkPosition}`
      ])
  }

  storage.set(filePath, video)
  video.save(path.normalize(pathToSave.filePath))
}

function kill(event, { filePath }) {
  const video = storage.get(filePath)
  if (video) {
    video.kill()
  }
}

function registerListeners() {
  ipcMain.on('video.cut', cut)
  ipcMain.on('video.kill', kill)
}

export function initialize() {
  registerListeners()
  console.log('[API] Cut initialized')
}
