import styled from 'styled-components'
import React, { useCallback, useState } from 'react'

import Button from '../components/Button'
import Input from '../components/Input'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  height: 100%;
`

const Video = styled.video`
  max-width: 100%;
  max-height: 100%;
  -webkit-app-region: no-drag;
`

const CloseButtonRegion = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
`

const TimeRegion = styled.div`
  margin-top: 30px;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
`

const TimePanel = styled.div`
  display: flex;
  margin: 5px 10px;
`

const Editor = ({ filePath, onClose, onSave }) => {
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const close = useCallback(() => onClose(), [onClose])
  const handleChangeStartTime = useCallback((event) => setStartTime(event.target.value), [])
  const handleChangeEndTime = useCallback((event) => setEndTime(event.target.value), [])

  const save = useCallback(() => {
    const start = parseInt(startTime, 10)
    const end = parseInt(endTime, 10)
    if (Number.isNaN(start) || start < 0) {
      console.error('Число начало видео либо NaN, либо меньше 0', { start, end })
      return
    }

    if (Number.isNaN(end) || end <= start) {
      console.error('Число окончания видео либо NaN, либо меньше или равно началу', { start, end })
      return
    }

    onSave(start, end)
  }, [startTime, endTime, onSave])

  return (
    <Container>
      <Video src={`file:///${filePath}`} controls />
      <TimeRegion>
        <TimePanel><Input placeholder="Start time" onChange={handleChangeStartTime} value={startTime}/></TimePanel>
        <TimePanel><Input placeholder="End time" onChange={handleChangeEndTime} value={endTime}/></TimePanel>
        <TimePanel><Button onClick={save}>Save</Button></TimePanel>
      </TimeRegion>
      <CloseButtonRegion>
        <Button onClick={close}>Close</Button>
      </CloseButtonRegion>
    </Container>
  )
}

export default Editor
