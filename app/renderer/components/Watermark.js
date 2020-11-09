import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled, { css } from 'styled-components'
import { Position } from '../../shared/constants/watermark'
import * as helpers from '../helpers'
import Button from './Button'
import ChooseMarkPosition from './ChooseMarkPosition'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 15%;
  width: 100%;
`

const Image = styled.div`
  height: 100%;
  width: 30%;
  margin-right: 40px;

  ${({ path }) => css`
    background: url(file:///${path}) no-repeat center / contain;
  `}
`

const RemoveBtn = styled.div`
  margin-left: 40px;
`

const Watermark = ({ data, onUpdate, onClear }) => {
  const handleChoose = React.useCallback(() => {
    helpers.dom.selectFiles(([file]) => onUpdate({
      filePath: file.path,
      position: Position.BottomRight,
    }), { accept: '.png,.jpg,.jpeg' })
  }, [onUpdate])

  const handleChangeMarkPosition = React.useCallback((position) => {
    onUpdate({
      ...data,
      position,
    })
  }, [data])

  return data.filePath ? (
    <Container>
      <Image path={helpers.fixPath(data.filePath)} />
      <ChooseMarkPosition position={data.position} onChoose={handleChangeMarkPosition} />
      <RemoveBtn><Button onClick={onClear}><FontAwesomeIcon icon={faTrash} /></Button></RemoveBtn>
    </Container>
  ) : (
    <Button onClick={handleChoose}>Add Watermark</Button>
  )
}

export default React.memo(Watermark)
