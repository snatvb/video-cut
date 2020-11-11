import React from 'react'
import styled from 'styled-components'
import { Maybe } from 'monad-maniac'
import { useSelector, useDispatch } from 'react-redux'

import * as selectors from '../../selectors'
import * as actions from '../../actions'
import * as helpers from '../../helpers'

const Base = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  -webkit-app-region: no-drag;
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
`

const Tenon = styled.div`
  position: absolute;
  top: 0;
  left: -8px;
  border-radius: 3px;
  background-color: #fff;
  width: 16px;
  height: 16px;
  -webkit-app-region: no-drag;
  cursor: pointer;

  &:active {
    cursor: grabbing;
  }
`

const calculateCursorPosition = (baseRef, event) => {
  const baseBounds = baseRef.current.getBoundingClientRect()
  const maxCursorPos = baseBounds.width
  const x = Math.min(maxCursorPos, Math.max(0, event.pageX - baseBounds.x))
  return x
}

const Cursor = () => {
  const [isDrag, setIsDrag] = React.useState(false)
  const baseRef = React.useRef(null)
  const cursorPosition = useSelector(selectors.timeline.getCursorPosition)
  const dispatch = useDispatch()

  const handleMouseDown = React.useCallback(() => {
    setIsDrag(true)
  }, [])

  const handleMouseUp = React.useCallback(() => {
    setIsDrag(false)
  }, [])

  const changeCursorPosition = React.useCallback((event) => {
    dispatch(actions.timeline.setCursorPosition(
      calculateCursorPosition(baseRef, event)
    ))
  }, [])

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

  const styles = Maybe.of(baseRef.current)
    .map(helpers.dom.getBoundingClientRect)
    .map(({ width }) => (
      (cursorPosition / width) * 100
    ))
    .map(helpers.clampPercent)
    .map((percent) => ({
      left: `${percent.toFixed(2)}%`,
    }))
    .getOrElse(undefined)

  return (
    <Base ref={baseRef} onClick={changeCursorPosition}>
      <Container style={styles}>
        <Line />
        <Tenon onMouseDown={handleMouseDown} />
      </Container>
    </Base>
  )
}

export default React.memo(Cursor)
