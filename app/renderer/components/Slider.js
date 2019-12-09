import React, { useRef, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  -webkit-app-region: no-drag;
  background-color: #252525;
  position: absolute;
  width: 200px;
  height: 6px;
  bottom: 10px;
  cursor: pointer;
`

const Progress = styled.div`
  background-color: #393939;
  position: absolute;
  height: 6px;
  left: 0;
  top: 0;
`

const Point = styled.div`
  -webkit-app-region: no-drag;
  background-color: #992929;
  position: absolute;
  height: 12px;
  width: 12px;
  left: 0;
  margin-left: -6px;
  top: -15px;
  cursor: pointer;
  &::after {
    background-color: #992929;
    position: absolute;
    display: block;
    content: '';
    height: 9px;
    width: 1px;
    bottom: -9px;
    left: 6px;
  }
`

const StartBracket = styled.div`
  -webkit-app-region: no-drag;
  background-color: #992929;
  position: absolute;
  margin-left: -4px;
  height: 10px;
  width: 4px;
  top: -2px;
  left: 0;
  &::after {
    background-color: #992929;
    position: absolute;
    display: block;
    content: '';
    height: 2px;
    width: 2px;
    left: 4px;
    bottom: 0;
  }
  &::before {
    background-color: #992929;
    position: absolute;
    display: block;
    content: '';
    height: 2px;
    width: 2px;
    left: 4px;
    top: 0;
  }
`

function Slider() {
  const [progress, setProgress] = useState(40)
  const [isDrag, setIsDrag] = useState(false)
  const containerRef = useRef(null)

  const setPositionElement = (pageX) => {
    const containerElement = containerRef.current
    const posXInside = pageX - containerElement.offsetLeft
    const percent = posXInside / containerElement.clientWidth * 100
    setProgress(
      percent > 100
        ? 100
        : percent < 0
          ? 0
          : percent
    )
  }

  const dragEnd = (event) => {
    setPositionElement(event.pageX)
    setIsDrag(false)
  }

  const drag = (event) => {
    setPositionElement(event.pageX)
  }

  useEffect(() => {
    if (isDrag) {
      window.addEventListener('mouseup', dragEnd)
      window.addEventListener('mousemove', drag)
    }
    return () => {
      window.removeEventListener('mouseup', dragEnd)
      window.removeEventListener('mousemove', drag)
    }
  }, [containerRef, isDrag])

  const startDrag = useCallback(() => {
    setIsDrag(true)
  }, [setIsDrag])

  return (
    <Container ref={containerRef}>
      <Progress style={{ width: `${progress}%` }} />
      <StartBracket />
      <Point style={{ left: `${progress}%` }}  onMouseDown={startDrag} />
    </Container>
  )
}

export default React.memo(Slider)
