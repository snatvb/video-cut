import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { useSelector } from 'react-redux'

import * as selectors from '../selectors'

const Container = styled.div`
  pointer-events: none;
  /* -webkit-app-region: no-drag; */
  align-items: center;
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 40px;
  top: 0;
  left: 0;
`

const Text = styled.div`
  background-color: rgba(0, 0, 0, .4);
  transition: all 250ms ease-in-out;
  text-transform: uppercase;
  justify-content: center;
  align-items: center;
  position: absolute;
  text-align: center;
  font-size: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  top: -60px;
  ${({ show }) => show && css`
    top: 0;
  `}
  ${({ theme }) => {
    switch(theme) {
      case 'success':
        return css`color: #adff2f;`
      case 'error':
        return css`color: #FE6969;`
      default:
        return undefined
    }
  }}
`

const Bar = styled.div`
  transition: all 200ms ease-in-out;
  background-color: #00A2D6;
  position: absolute;
  height: 4px;
  left: 0;
  top: -60px;
  ${({ show }) => show && css`
    top: 0;
  `}
`

const ProgressBar = () => {
  const progressState = useSelector(selectors.progress.get)
  console.log('progressState', progressState)

  return (
    <Container>
      <Text show={progressState.success} theme="success">Success</Text>
      <Text show={!progressState.success && Boolean(progressState.error)} theme="error">{progressState.error}</Text>
      <Bar show={progressState.percent > 0 && !progressState.success} style={{ width: `${progressState.percent}%` }} />
    </Container>
  )
}

export default ProgressBar
