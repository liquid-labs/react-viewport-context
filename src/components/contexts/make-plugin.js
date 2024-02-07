const makePlugin = (obj, key, attribute, validAttributes) => {
  const pluginFunc = (prevInfo, newInfo) => {
    if (!(attribute in validAttributes)) {
      throw new Error(`No such attribute '${attribute}' to extract from '${key}'.`)
    }

    const value = attribute === 'screenX' || attribute === 'screenLeft'
      ? obj.screenX || obj.screenLeft
      : attribute === 'screenY' || attribute === 'screenTop'
        ? obj.screenY || obj.screenTop
        : attribute === 'angle'
          ? obj.orientation.angle
          : attribute === 'orientation'
            ? obj.orientation.type
            : obj[attribute]

    if (value !== prevInfo[key][attribute]) {
      newInfo[key][attribute] = value
      return true
    }
    return false
  }

  pluginFunc.target = key
  pluginFunc.attribute = attribute
  pluginFunc.events = validAttributes[attribute].events

  return pluginFunc
}

const VALID_SCREEN_ATTRIBUTES = {
  'angle': { events: ['deviceorientation', 'move'] },
  'availHeight': { events: ['deviceorientation', 'move'] },
  'availWidth': { events: ['deviceorientation', 'move'] },
  'colorDepth': { events: ['move'] },
  'height': { events: ['deviceorientation', 'move'] },
  'orientation': { events: ['deviceorientation', 'move'] },
  'pixelDepth': { events: ['move'] },
  'width': { events: ['deviceorientation', 'move'] }
}

const VALID_VISUAL_VIEWPORT_ATTRIBUTES = {
  'height': { events: ['deviceorientation', 'resize'] },
  // TOOD: not totally sure about these next four; what events are necessary?
  'offsetLeft': { events: ['deviceorientation', 'resize', 'scroll'] },
  'offsetTop': { events: ['deviceorientation', 'resize', 'scroll'] },
  'pageLeft': { events: ['deviceorientation', 'resize', 'scroll'] },
  'pageTop': { events: ['deviceorientation', 'resize', 'scroll'] },
  // 'scale': very complicated, hard to detect
  'width': { events: ['deviceorientation', 'resize'] }
}

const VALID_WINDOW_ATTRIBUTES = {
  'innerHeight': { events: ['deviceorientation', 'resize'] },
  'innerWidth': { events: ['deviceorientation', 'resize'] },
  'outerHeight': { events: ['deviceorientation', 'resize'] },
  'outerWidth': { events: ['deviceorientation', 'resize'] },
  'screenLeft': { events: ['deviceorientation', 'move', 'resize'] },
  'screenTop': { events: ['deviceorientation', 'move', 'resize'] },
  'screenX': { events: ['deviceorientation', 'move', 'resize'] },
  'screenY': { events: ['deviceorientation', 'move', 'resize'] },
  'scrollX': { events: ['deviceorientation', 'move', 'resize', 'scroll'] },
  'scrollY': { events: ['deviceorientation', 'move', 'resize', 'scroll'] }
}

const makeScreenPlugin = (attribute) => makePlugin(window.screen, 'screen', attribute, VALID_SCREEN_ATTRIBUTES)
const makeVisualViewportPlugin = (attribute) => 
  makePlugin(window.visualViewport, 'visualViewport', attribute, VALID_VISUAL_VIEWPORT_ATTRIBUTES)
const makeWindowPlugin = (attribute) => makePlugin(window, 'window', attribute, VALID_WINDOW_ATTRIBUTES)

export {
  makeScreenPlugin,
  makeVisualViewportPlugin,
  makeWindowPlugin,
  VALID_SCREEN_ATTRIBUTES,
  VALID_VISUAL_VIEWPORT_ATTRIBUTES,
  VALID_WINDOW_ATTRIBUTES
}