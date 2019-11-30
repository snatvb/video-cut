import styled from 'styled-components'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as actions from '../actions'
import * as helpers from '../helpers'
import * as selectors from '../selectors'
import Button from '../components/Button'
import Editor from '../components/Editor'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  height: 100%;
`

const H2 = styled.h2`
  width: 100%;
  text-align: center;
  margin-top: 0;
`


const Main = () => {
  const dispatch = useDispatch()
  const filePath = useSelector(selectors.file.getPath)

  const openFile = useCallback(() => {
    helpers.dom.selectFiles(([file]) => dispatch(actions.file.add(file)), { accept: '.mp4,.avi' })
  }, [])

  if (filePath) {
    return (
      <Editor filePath={filePath} />
    )
  }

  return (
    <Container>
      <H2>Choose file for cut</H2>
      <Button onClick={openFile}>Open</Button>
    </Container>
  )
}

export default Main
