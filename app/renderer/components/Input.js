import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  background-color: #252525;
  border: none;
  color: rgb(230, 230, 230);
  font-size: 18px;
  padding: 6px 12px;
  border-radius: 3px;
  -webkit-app-region: no-drag;
  outline: none;
  width: 100%;

  &:hover, &:focus {
    background-color: #393939;
  }
`

export default function Component(props) {
  return <Input type="text" {...props} />
}
