const stringToColor = (string: string, lightness = 55) => {
  let hash = 0
  const saturation = 30

  for (let i = 0; i < string.slice(0, 50).length; i++) {
    hash =
      string.charCodeAt(i) * string.charCodeAt(string.length - 1) +
      ((hash << 4) - hash * string.charCodeAt(0))
  }
  return `hsla(${hash % 360}, ${saturation}%, ${lightness}%)`
}

function randomColorWithName(text: string, m?: 'light' | 'dark') {
  const mode = m || localStorage.getItem('mode')
  if (text === '') return '#fff'
  const n = text.split('').reduce((p, c) => {
    return p + c.charCodeAt(0)
  }, 0)
  return `hsl(${(n % 155) + 100}, 70%, ${mode === 'light' ? 90 : 15}%)`
}

export { stringToColor, randomColorWithName }
