import React from 'react'
import styled from 'styled-components'

export const Type = {
  Default: 'default',
  CurrentTime: 'currentTime',
}

const Base = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 16px;
`

const Line = styled.div`
  position: absolute;
  height: 100%;
  width: 1px;
  top: 0;
  left: 0;
  background-color: #fff;

  ${Base}.${Type.CurrentTime} & {
    background-color: #abe0f4;
  }
`

const Tenon = styled.div`
  position: absolute;
  top: -16px;
  left: -8px;
  border-radius: 3px;
  background-color: #fff;
  width: 16px;
  height: 16px;
  -webkit-app-region: no-drag;
  cursor: pointer;

  ${Base}.${Type.CurrentTime} & {
    background: linear-gradient(0deg, rgba(0,161,221,1) 0%, rgba(0,212,255,1) 100%);
  }

  &:active {
    cursor: grabbing;
  }
`

const calculateCursorPosition = (baseRef, event) => {
  const baseBounds = baseRef.current.getBoundingClientRect()
  const maxCursorPos = baseBounds.width
  const x = Math.min(maxCursorPos, Math.max(0, event.pageX - baseBounds.x))
  return (x / baseBounds.width) * 100
}

const Cursor = ({ onDrag, position, type = Type.Default }) => {
  const [isDrag, setIsDrag] = React.useState(false)
  const baseRef = React.useRef(null)

  const handleMouseDown = React.useCallback(() => {
    setIsDrag(true)
  }, [])

  const handleMouseUp = React.useCallback(() => {
    setIsDrag(false)
  }, [])

  const changeCursorPosition = React.useCallback((mouseEvent) => {
    const position = calculateCursorPosition(baseRef, mouseEvent)
    onDrag({ position, mouseEvent })
  }, [onDrag])

  React.useEffect(() => {
    if (isDrag) {
      window.addEventListener('mousemove', changeCursorPosition)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', changeCursorPosition)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDrag, changeCursorPosition])

  const styles = { left: `${position.toFixed(2)}%` }

  return (
    <Base ref={baseRef} onClick={changeCursorPosition} className={type}>
      <Container style={styles}>
        <Line />
        {onDrag && <Tenon onMouseDown={handleMouseDown} />}
      </Container>
    </Base>
  )
}

export default React.memo(Cursor)
