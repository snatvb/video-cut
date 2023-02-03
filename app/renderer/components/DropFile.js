import { faFileVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import styled, { css } from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  color: #fff;
  outline: none;
  -webkit-app-region: no-drag;
`

const DisplayArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  box-sizing: border-box;
  margin: 0 20px;
  font-size: 24px;
  transition: background-position 400ms ease;
  background-size: 130% 130%;
  background-image: linear-gradient(to bottom right, #ff3cac, #562b7c, #2b86c5);
  background-position: 0% 0%;
  background-repeat: no-repeat;
  border-radius: 10px;

  &:hover {
    background-position: 60% 60%;
  }

  ${({ isActive }) => isActive && css`
    background-position: 100% 100%;
  `}
`

const Icon = styled.div`
  display: inline-block;
  margin-right: 10px;
`

const DropFile = ({ onChoose }) => {
  const handleDrop = React.useCallback((files) => {
    const videos = files.filter(({ type }) => type.startsWith('video/'))
    const video = videos[0]

    if (video) {
      onChoose(video)
    }
  }, [onChoose])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  })

  return (
    <Container {...getRootProps()}>
      <DisplayArea isActive={isDragActive}>
        <input {...getInputProps()} accept=".mp4,.avi,.mov" multiple={false} />
        <Icon>
          <FontAwesomeIcon icon={faFileVideo} />
        </Icon>
        Drop here or click to choose file
      </DisplayArea>
    </Container>
  )
}

export default React.memo(DropFile)
