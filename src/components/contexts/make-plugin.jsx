/* global WindowContext */
import { breakpointPlugin } from './breakpoint-plugin' /* eslint-disable-line node/no-missing-import */

/**
 * Helper function used by the more specific {@link makeScreenPlugin}, {@link makeVisualViewportPlugin}, and
 * {@link makeWindowPlugin}.
 * @param {object} obj - The data source object; either `screen`, `visualViewport', or `window`.
 * @param {string} key - The key to access the sub-data object of the {@link WindowContext} info object. This will
 *   match the `obj` (e.g., 'screen' for the `screen` object).
 * @param {string} attribute - The attribute of the specified `obj` to extract.
 * @param {object} validAttributes - An object defining the valid attributes for the given `obj` type and the events
 *   associated with each attribute.
 * @returns {Function} A plugin func to retrieve the requested attributes.
 * @private
 */
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

/**
 * Object defining the valid `screen` attributes. Also defines associated events that might cause a change in the value
 * of each attribute. Refer to source code for list of supported attributes.
 */
const VALID_SCREEN_ATTRIBUTES = {
  angle       : { events : ['deviceorientation', 'move'] },
  availHeight : { events : ['deviceorientation', 'move'] },
  availWidth  : { events : ['deviceorientation', 'move'] },
  colorDepth  : { events : ['move'] },
  height      : { events : ['deviceorientation', 'move'] },
  orientation : { events : ['deviceorientation', 'move'] },
  pixelDepth  : { events : ['move'] },
  width       : { events : ['deviceorientation', 'move'] }
}

/**
 * Object defining the valid `visualViewport` attributes. Also defines associated events that might cause a change in
 * the value of each attribute. Refer to source code for list of supported attributes.
 */
const VALID_VISUAL_VIEWPORT_ATTRIBUTES = {
  height     : { events : ['deviceorientation', 'resize'] },
  // TOOD: not totally sure about these next four; what events are necessary?
  offsetLeft : { events : ['deviceorientation', 'resize', 'scroll'] },
  offsetTop  : { events : ['deviceorientation', 'resize', 'scroll'] },
  pageLeft   : { events : ['deviceorientation', 'resize', 'scroll'] },
  pageTop    : { events : ['deviceorientation', 'resize', 'scroll'] },
  // 'scale': very complicated, hard to detect
  width      : { events : ['deviceorientation', 'resize'] }
}

/**
 * Object defining the valid `window` attributes. Also defines  associated events that might cause a change in the
 * value of each attribute. Refer to source code for list of supported attributes.
 */
const VALID_WINDOW_ATTRIBUTES = {
  innerHeight : { events : ['deviceorientation', 'resize'] },
  innerWidth  : { events : ['deviceorientation', 'resize'] },
  outerHeight : { events : ['deviceorientation', 'resize'] },
  outerWidth  : { events : ['deviceorientation', 'resize'] },
  screenLeft  : { events : ['deviceorientation', 'move', 'resize'] },
  screenTop   : { events : ['deviceorientation', 'move', 'resize'] },
  screenX     : { events : ['deviceorientation', 'move', 'resize'] },
  screenY     : { events : ['deviceorientation', 'move', 'resize'] },
  scrollX     : { events : ['deviceorientation', 'move', 'resize', 'scroll'] },
  scrollY     : { events : ['deviceorientation', 'move', 'resize', 'scroll'] }
}

/**
 * Function to generate plugins to extract `screen` related data.
 * @param {string} attribute - The `screen` attribute to track.
 * @returns {Function} A {@link WindowContext} plugin.
 * @throws Raises an error if attribute is invalid.
 * @see {@link VALID_SCREEN_ATTRIBUTES} for valid attributes.
 * @see {@link makeWindowPlugin} for an example.
 */
const makeScreenPlugin = (attribute) => makePlugin(window.screen, 'screen', attribute, VALID_SCREEN_ATTRIBUTES)

/**
 * Function to generate plugins to extract `visualViewport` related data.
 * @param {string} attribute - The `visualViewport` attribute to track.
 * @returns {Function} A {@link WindowContext} plugin.
 * @throws Raises an error if attribute is invalid.
 * @see {@link VALID_VISUAL_VIEWPORT_ATTRIBUTES} for valid attributes.
 * @see {@link makeWindowPlugin} for an example.
 */
const makeVisualViewportPlugin = (attribute) =>
  makePlugin(window.visualViewport, 'visualViewport', attribute, VALID_VISUAL_VIEWPORT_ATTRIBUTES)

/**
 * Function to generate plugins to extract `window` related data.
 * @param {string} attribute - The `window` attribute to track.
 * @returns {Function} A {@link WindowContext} plugin.
 * @throws Raises an error if attribute is invalid.
 * @see {@link VALID_WINDOW_ATTRIBUTES} for valid attributes.
 * @example
 * const innerHeightPlugin = makeWindowPlugin('innerHeight')
 *
 * return (
 *   <WindowContext plugins={[innerHeightPlugin]}>
 *     <DisplayInnerHeight />
 *   </WindowContext>
 * )
 */
const makeWindowPlugin = (attribute) => makePlugin(window, 'window', attribute, VALID_WINDOW_ATTRIBUTES)

/**
 * Convenience method to create all `screen` related plugins.
 * @returns {Function[]} An array of {@link WindowContext} plugins.
 * @see {@link allWindowPlugins} for an example.
 */
const allScreenPlugins = () => Object.keys(VALID_SCREEN_ATTRIBUTES).map((attribute) => makeScreenPlugin(attribute))

/**
 * Convenience method to create all `visualViewport` related plugins.
 * @returns {Function[]} An array of {@link WindowContext} plugins.
 * @see {@link allWindowPlugins} for an example.
 */
const allVisualViewportPlugins = () =>
  Object.keys(VALID_VISUAL_VIEWPORT_ATTRIBUTES).map((attribute) => makeVisualViewportPlugin(attribute))

/**
 * Convenience method to create all `screen` related plugins.
 * @returns {Function[]} An array of {@link WindowContext} plugins.
 * @example
 * const allWindowPlugins = allWindowPlugins()
 *
 * return (
 *   <WindowContext plugins={allWindowPlugins}>
 *     <DisplayAllWindowData />
 *   </WindowContext>
 * )
 */
const allWindowPlugins = () => Object.keys(VALID_WINDOW_ATTRIBUTES).map((attribute) => makeWindowPlugin(attribute))

/**
 * Convenience method to track all data for `window`, `screen`, and `visualViewport`.
 * @returns {Function[]} An array of {@link WindowContext} plugins.
 * @see {@link allWindowPlugins} for an example.
 */
const allPlugins = () => [breakpointPlugin, ...allScreenPlugins(), ...allVisualViewportPlugins(), ...allWindowPlugins()]

export {
  allPlugins,
  allScreenPlugins,
  allVisualViewportPlugins,
  allWindowPlugins,
  makeScreenPlugin,
  makeVisualViewportPlugin,
  makeWindowPlugin,
  VALID_SCREEN_ATTRIBUTES,
  VALID_VISUAL_VIEWPORT_ATTRIBUTES,
  VALID_WINDOW_ATTRIBUTES
}
