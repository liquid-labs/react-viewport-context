const makePlugin = (obj, key, attribute) => (prevInfo, newInfo) => {
  const value = obj[attribute]

  if (value !== prevInfo[key][attribute]) {
    newInfo[key][attribute] = value
    return true
  }
  return false
}

export const innerWidthPlugin = makePlugin(window, 'window', 'innerWidth')
export const innerHeightPlugin = makePlugin(window, 'window', 'innerHeight')
export const outerWidthPlugin = makePlugin(window, 'window', 'outerWidth')
export const outerHeightPlugin = makePlugin(window, 'window', 'outerHeight')
export const screenXPlugin = makePlugin(window, 'window', 'screenX')
export const screenYPlugin = makePlugin(window, 'window', 'screenY')
export const scrollXPlugin = makePlugin(window, 'window', 'scrollX')
export const scrollYPlugin = makePlugin(window, 'window', 'scrollY')
