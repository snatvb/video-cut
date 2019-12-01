import React from 'react'
import styled from 'styled-components'

import ProgressBar from './ProgressBar'

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Application = ({ children }) => {
  return (
    <Container>
      {children}
      <ProgressBar />
    </Container>
  )
}

export default Application
