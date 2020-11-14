import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'

import * as selectors from '../../selectors'

const Shadow = styled.div`
  background-color: rgba(0,0,0, .4);
  position: absolute;
  height: 100%;
  top: 0;

  ${({ isRight }) => (isRight ? css`
    right: 0;
  ` : css`
    left: 0;
  `)}
`

const Shadows = () => {
  const startPosition = useSelector(selectors.timeline.getStartCursor).getOrElse(0)
  const endPosition = useSelector(selectors.timeline.getEndCursor).getOrElse(100)

  const leftStyles = {
    width: `${startPosition}%`
  }

  const rightStyles = {
    width: `${100 - endPosition}%`
  }

  return (
    <>
      <Shadow style={leftStyles} />
      <Shadow style={rightStyles} isRight />
    </>
  )
}

export default React.memo(Shadows)
