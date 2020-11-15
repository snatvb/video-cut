import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as selectors from '../../selectors'
import * as actions from '../../actions'
import Cursor, { Type } from './Cursor'

const Cursors = ({ onChangeTime }) => {
  const dispatch = useDispatch()
  const currentPosition = useSelector(selectors.timeline.getCurrentCursor)
  const startPosition = useSelector(selectors.timeline.getStartCursor).getOrElse(0)
  const endPosition = useSelector(selectors.timeline.getEndCursor).getOrElse(100)

  const handleDragStart = React.useCallback((event) => {
    if (event.position < endPosition) {
      dispatch(actions.timeline.setStartCursor(event.position))
    }
  }, [endPosition])

  const handleDragEnd = React.useCallback((event) => {
    if (event.position > startPosition) {
      dispatch(actions.timeline.setEndCursor(event.position))
    }
  }, [startPosition])

  const handleDragCurrent = React.useCallback((event) => {
    dispatch(actions.timeline.setCurrentCursor(event.position))
    onChangeTime(event)
  }, [onChangeTime])

  return (
    <>
      <Cursor position={startPosition} onDrag={handleDragStart} />
      <Cursor position={endPosition} onDrag={handleDragEnd} />
      <Cursor position={currentPosition} onDrag={handleDragCurrent} type={Type.CurrentTime} />
    </>
  )
}

export default React.memo(Cursors)
