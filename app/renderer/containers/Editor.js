import { faSave } from '@fortawesome/free-regular-svg-icons'
import { faArrowLeft, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Maybe } from 'monad-maniac'
import * as R from 'ramda'
import React, { useCallback, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Button, { ButtonTheme } from '../components/Button'
import Input from '../components/Input'
import WaterMark from '../components/Watermark'
import Timeline from './Timeline'
import useRafLoop from '../hooks/useRafLoop'
import * as actions from '../actions'
import * as helpers from '../helpers'
import * as selectors from '../selectors'


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  height: 100%;
  padding: 40px 20px;
`

const Video = styled.video`
  -webkit-app-region: no-drag;
  max-height: 60%;
  max-width: 100%;
  outline: none;
  border-radius: 10px;
`

const ButtonsRegion = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`

const TimeRegion = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
`

const InputPanel = styled.div`
  display: flex;
  margin: 5px 10px;

  ${Button} {
    margin-left: 5px;
  }
`

const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  line-height: 100%;
`

const Editor = ({ filePath, onClose, onSave }) => {
  const dispatch = useDispatch()

  const watermark = useSelector(selectors.watermark.get)
  const videoSettings = useSelector(selectors.videoSettings.get)
  const startCursor = useSelector(selectors.timeline.getStartCursor).getOrElse(undefined)
  const endCursor = useSelector(selectors.timeline.getEndCursor).getOrElse(undefined)

  const videoRef = useRef(null)
  const close = useCallback(() => onClose(), [onClose])

  const updateWatermark = React.useCallback((newWatermark) => {
    dispatch(actions.watermark.update(newWatermark))
  }, [])

  const dropWatermark = React.useCallback(() => {
    dispatch(actions.watermark.clear())
  }, [])

  const enableSound = React.useCallback(() => {
    dispatch(actions.videoSettings.setAudioEnabled(true))
  }, [])

  const disableSound = React.useCallback(() => {
    dispatch(actions.videoSettings.setAudioEnabled(false))
  }, [])

  const handleChangeBitrate = React.useCallback((event) => {
    if (event.target.value.length === 0) {
      dispatch(actions.videoSettings.setBitrate(undefined))
    } else {
      Maybe.of(parseInt(event.target.value))
        .filter(helpers.notIsNaN)
        .filter((x) => x > 0)
        .map(R.compose(dispatch, actions.videoSettings.setBitrate))
    }
  }, [])

  const handleChangeTime = useCallback((event) => {
    const video = videoRef.current
    video.pause()
    video.currentTime = video.duration * (event.position / 100)
  }, [onSave])

  useRafLoop(() => {
    if (!videoRef.current.paused) {
      dispatch(actions.timeline.setCurrentCursor(
        (videoRef.current.currentTime / videoRef.current.duration ) * 100
      ))
    }
  }, [])

  useEffect(() => {
    videoRef.current.pause()
  }, [startCursor, endCursor])

  const save = useCallback(() => {
    onSave(videoRef.current)
  }, [onSave])

  return (
    <Container>
      <Video ref={videoRef} src={`file:///${filePath}`} controls />
      <TimeRegion>
        <InputPanel>
          <Label>Bitrate:</Label>
          <Input placeholder="Bitrate (2000 by default)" onChange={handleChangeBitrate} value={videoSettings.bitrate || ''} />
        </InputPanel>
        <InputPanel>
          {videoSettings.audio.enabled ? (
            <Button onClick={disableSound}><FontAwesomeIcon icon={faVolumeUp} className="fa-interactive" /></Button>
          ) : (
            <Button onClick={enableSound}><FontAwesomeIcon icon={faVolumeMute} className="fa-interactive" /></Button>
          )}
        </InputPanel>
      </TimeRegion>
      <Timeline onChangeTime={handleChangeTime} />
      <WaterMark onUpdate={updateWatermark} onClear={dropWatermark} data={watermark} />
      <ButtonsRegion>
        <Button onClick={close} theme={ButtonTheme.Danger}>
          <FontAwesomeIcon icon={faArrowLeft} className="fa-interactive" />
        </Button>
        <Button onClick={save} theme={ButtonTheme.Info}>
          <FontAwesomeIcon icon={faSave} className="fa-interactive" />
        </Button>
      </ButtonsRegion>
    </Container>
  )
}

export default React.memo(Editor)
