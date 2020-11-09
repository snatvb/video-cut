import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../actions'
import CloseButton from '../components/CloseButton'
import ProgressBar from './ProgressBar'


const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Application = ({ children }) => {
  const dispatch = useDispatch()
  const close = useCallback(() => {
    dispatch(actions.app.close())
  }, [])

  return (
    <Container>
      <CloseButton onClick={close} />
      {children}
      <ProgressBar />
    </Container>
  )
}

export default Application
