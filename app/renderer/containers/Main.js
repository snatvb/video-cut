import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../actions'
import DropFile from '../components//DropFile'
import * as selectors from '../selectors'
import Editor from './Editor'


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  height: 100%;
`

const Main = () => {
  const dispatch = useDispatch()
  const filePath = useSelector(selectors.file.getPath)

  const handleChoose = useCallback((file) => {
    dispatch(actions.file.add(file))
  }, [])

  const closeEditor = useCallback(() => {
    dispatch(actions.file.clear())
  }, [])

  const saveVideo = useCallback((videoElement) => {
    console.debug('Сохранение видео', {
      filePath,
      videoElement,
    })
    dispatch(actions.file.save(videoElement))
  }, [])

  if (filePath) {
    return (
      <Editor filePath={filePath} onClose={closeEditor} onSave={saveVideo} />
    )
  }

  return (
    <Container>
      <DropFile onChoose={handleChoose} />
    </Container>
  )
}

export default Main
