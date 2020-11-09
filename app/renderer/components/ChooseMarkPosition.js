import React from 'react'
import styled from 'styled-components'
import { Position } from '../../shared/constants/watermark'
import MarkPosition from './MarkPosition'

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 120px;
  border-radius: 10px;
  border: 3px solid #393939;
  -webkit-app-region: no-drag;
`

const ChooseMarkPosition = ({ position, onChoose }) => {
  return (
    <Container>
      {Object.values(Position).map((pos) => (
        <MarkPosition
          position={pos}
          isActive={pos === position}
          key={pos}
          onChoose={onChoose}
        />
      ))}
    </Container>
  )
}

export default React.memo(ChooseMarkPosition)
