import React from 'react'
import styled from 'styled-components'

import Cursors from './Cursors'
import Shadows from './Shadows'

const Container = styled.div`
  position: relative;
  width: 90%;
  height: 40px;
  margin: 20px auto;
  background: linear-gradient(0deg, rgba(0,161,221,1) 0%, rgba(0,212,255,1) 100%);

  -webkit-app-region: no-drag;
`

const Timeline = ({ onChangeTime }) => {
  return (
    <Container>
      <Cursors onChangeTime={onChangeTime} />
      <Shadows />
    </Container>
  )
}

export default React.memo(Timeline)

