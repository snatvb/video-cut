import React from 'react'
import styled, { css } from 'styled-components'
import { Position } from '../../shared/constants/watermark'

const stylesByPosition = {
  [Position.TopLeft]: css`
    left: 6px;
    top: 6px;
  `,
  [Position.TopRight]: css`
    right: 6px;
    top: 6px;
  `,
  [Position.BottomLeft]: css`
    left: 6px;
    bottom: 6px;
  `,
  [Position.BottomRight]: css`
    right: 6px;
    bottom: 6px;
  `,
}

const Container = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 5px;
  background-color: #101010;
  cursor: pointer;
  -webkit-app-region: no-drag;

  ${({ position }) => stylesByPosition[position] || ''}
  ${({ isActive }) => isActive && css`
    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 3px;
      top: 3px;
      background-color: #00a1dd;
      width: 12px;
      height: 12px;
      border-radius: 3px;
    }
  `}
`

const MarkPosition = ({ position, isActive, onChoose }) => {
  const handleClick = React.useCallback(() => {
    onChoose(position)
  }, [onChoose, position])

  return (
      <Container position={position} isActive={isActive} onClick={isActive ? undefined : handleClick} />
  )
}

export default React.memo(MarkPosition)
