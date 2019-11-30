import styled from 'styled-components'
import React, { useCallback } from 'react'

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

const Editor = ({ filePath, onClose }) => {
  const close = useCallback(() => onClose(), [onClose])

  return (
    <Container>
      <Video src={`file:///${filePath}`} controls />
      <TimeRegion>
        <TimePanel><Input placeholder="Start time" /></TimePanel>
        <TimePanel><Input placeholder="End time" /></TimePanel>
        <TimePanel><Button>Save</Button></TimePanel>
      </TimeRegion>
      <CloseButtonRegion>
        <Button onClick={close}>Close</Button>
      </CloseButtonRegion>
    </Container>
  )
}

export default Editor
