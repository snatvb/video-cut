import styled, { css } from 'styled-components'

const getCssBySize = (size) => {
  switch (size) {
    case 'small':
      return css`
        font-size: 12px;
        padding: 4px 8px;
      `

    default:
      return css`
        font-size: 18px;
        padding: 6px 12px;
      `
  }
}

const Button = styled.button`
  background-color: #393939;
  border: none;
  color: rgb(230, 230, 230);
  border-radius: 3px;
  -webkit-app-region: no-drag;
  outline: none;
  cursor: pointer;
  height: 32px;

  ${({ size }) => getCssBySize(size)}

  &:hover, &:focus {
    background-color: #494949;
  }
`

export default Button
