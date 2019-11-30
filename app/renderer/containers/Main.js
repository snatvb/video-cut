import styled from 'styled-components'
import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import Button from '../components/Button'
import * as helpers from '../helpers'

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
  const fileActions = bindActionCreators(actions.file, dispatch)

  const openFile = useCallback(() => {
    helpers.dom.selectFiles(([file]) => fileActions.add(file))
  }, [])

  return (
    <Container>
      <H2>Choose file for cut</H2>
      <Button onClick={openFile}>Open</Button>
    </Container>
  )
}

export default Main
