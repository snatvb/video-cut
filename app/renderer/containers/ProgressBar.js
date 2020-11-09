import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
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
    switch (theme) {
      case 'success':
        return css`color: #adff2f;`
      case 'error':
        return css`color: #FE6969;`
      default:
        return undefined
    }
  }}
`

const BarContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, .8);
  z-index: 999;
  overflow: hidden;
`

const Bar = styled.div`
  border-radius: 5px;
  transition: all 200ms ease-in-out;
  background-image: linear-gradient(to bottom right, #ff3cac, #562b7c, #2b86c5);
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProgressBar = () => {
  const progressState = useSelector(selectors.progress.get)

  return (
    <>
      <Container>
        <Text show={progressState.success} theme="success">Success</Text>
        <Text show={!progressState.success && Boolean(progressState.error)} theme="error">{progressState.error}</Text>
      </Container>
      {progressState.percent > 0 && (
        <BarContainer>
          <Bar show={progressState.percent > 0 && !progressState.success} style={{ width: `${progressState.percent}%` }}>
            {`${Math.round(progressState.percent)}%`}
          </Bar>
        </BarContainer>
      )}
    </>
  )
}

export default React.memo(ProgressBar)
