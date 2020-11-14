import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as selectors from '../../selectors'
import * as actions from '../../actions'
import Cursor from './Cursor'

const Cursors = () => {
  const dispatch = useDispatch()
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

  return (
    <>
      <Cursor position={startPosition} onDrag={handleDragStart} />
      <Cursor position={endPosition} onDrag={handleDragEnd} />
    </>
  )
}

export default React.memo(Cursors)
