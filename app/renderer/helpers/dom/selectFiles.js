const selectFiles = (callback, { multiple = false, accept = undefined } = {}) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.style.display = 'none'
  input.multiple = Boolean(multiple)
  if (accept) { input.accept = accept }
  input.onchange = () => {
    console.debug('FILES', 'Changed input file', input.files)
    callback(Array.from(input.files))
    input.onchange = null
    input.remove() // remove from dom
  }
  document.body.appendChild(input) // adding to dom
  console.debug('FILES', 'Input file created', input)
  input.click()
}

export default selectFiles
