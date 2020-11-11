import { faSave } from '@fortawesome/free-regular-svg-icons'
import { faArrowLeft, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Maybe } from 'monad-maniac'
import * as R from 'ramda'
import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../actions'
import Button, { ButtonTheme } from '../components/Button'
import Input from '../components/Input'
import WaterMark from '../components/Watermark'
import Timeline from './Timeline'
import * as helpers from '../helpers'
import * as selectors from '../selectors'


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  height: 100%;
`

const Video = styled.video`
  -webkit-app-region: no-drag;
  max-height: 60%;
  max-width: 100%;
  outline: none;
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

const Editor = ({ filePath, onClose, onSave }) => {
  const dispatch = useDispatch()

  const watermark = useSelector(selectors.watermark.get)
  const videoSettings = useSelector(selectors.videoSettings.get)

  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const videoRef = useRef(null)
  const close = useCallback(() => onClose(), [onClose])
  const handleChangeStartTime = useCallback((event) => setStartTime(event.target.value), [])
  const handleChangeEndTime = useCallback((event) => setEndTime(event.target.value), [])

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

  const save = useCallback(() => {
    const start = Maybe.of(parseInt(startTime, 10))
      .filter(helpers.notIsNaN)
      .filter((time) => time < videoRef.current.duration - 1)
      .getOrElse(0)
    const end = Maybe.of(parseInt(endTime, 10))
      .filter(helpers.notIsNaN)
      .filter((time) => time > start)
      .filter((time) => time < videoRef.current.duration)
      .getOrElse(videoRef.current.duration)

    console.log(start, end)

    onSave(start, end)
  }, [startTime, endTime, onSave])

  const setCurrentTimeStart = useCallback(() => {
    setStartTime(Math.round(videoRef.current.currentTime))
  }, [videoRef])

  const setCurrentTimeEnd = useCallback(() => {
    setEndTime(Math.round(videoRef.current.currentTime))
  }, [videoRef])

  return (
    <Container>
      <Video ref={videoRef} src={`file:///${filePath}`} controls />
      <TimeRegion>
        <InputPanel>
          <Input placeholder="Bitrate (2000 by default)" onChange={handleChangeBitrate} value={videoSettings.bitrate || ''} />
        </InputPanel>
        <InputPanel>
          <Input placeholder="Start time" onChange={handleChangeStartTime} value={startTime} />
          <Button onClick={setCurrentTimeStart} size="small">Current Time</Button>
        </InputPanel>
        <InputPanel>
          <Input placeholder="End time" onChange={handleChangeEndTime} value={endTime} />
          <Button onClick={setCurrentTimeEnd} size="small">Current Time</Button>
        </InputPanel>
        <InputPanel>
          {videoSettings.audio.enabled ? (
            <Button onClick={disableSound}><FontAwesomeIcon icon={faVolumeUp} className="fa-interactive" /></Button>
          ) : (
              <Button onClick={enableSound}><FontAwesomeIcon icon={faVolumeMute} className="fa-interactive" /></Button>
            )}
        </InputPanel>
      </TimeRegion>
      <Timeline />
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
