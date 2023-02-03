import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  -webkit-app-region: no-drag;
  color: rgb(230, 230, 230);
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 24px;
  cursor: pointer;
  outline: none;
  height: 30px;
  width: 30px;
  display: flex;
  right: 10px;
  top: 10px;

  &:hover, &:focus {
    color: rgb(240, 240, 240);
  }
`

const CloseButton = (props) => (
  <Container {...props}>×</Container>
)

export default React.memo(CloseButton)
