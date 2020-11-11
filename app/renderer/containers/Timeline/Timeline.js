import React from 'react'
import styled from 'styled-components'

import Cursor from './Cursor'

const Container = styled.div`
  position: relative;
  width: 90%;
  height: 80px;
  margin: 0 auto;

  -webkit-app-region: no-drag;
`

const Timeline = () => {
  return (
    <Container>
      <Cursor />
    </Container>
  )
}

export default React.memo(Timeline)

