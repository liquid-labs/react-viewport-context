/**
 * Retrieves the theme and verifies that it is structurally correct. See {@link breakpointPlugin} for the required 
 * structure.
 * 
 * @private
 */
const doGetTheme = (getTheme) => {
  if (getTheme === undefined) {
    throw new Error("'getTheme' is required when 'breakpointPlugin' is present for 'ViewportContext'.")
  }
  const theme = getTheme()
  if (!theme) {
    throw new Error("'ViewportContext' 'getTheme' did not return a theme.")
  }
  if (theme.breakpoints?.values === undefined) {
    throw new Error("Theme provided to 'ViewportContext' does not define required 'breakpoints.values'.")
  }
  return theme
}

/** 
 * Plugin to track whether the theme 'breakpoint' has changed or not. This method works in conjuction with a [Material 
 *  UI](https://mui.com/material-ui/) theme or any theme that provides:
 * ```javascript
 * { 
 *   breakpoints: {
 *     values: {
 *       key1: 0, // cuttoff in pixels above which the breakpoint is activated
 *       key2: 100,
 *     }
 *   }
 * }
 * ```
 * 
 * The typical breakpoints are 'xs', 'sm', 'md', 'lg', 'xl', but in practice can be anything.
 * 
 * @param {object} prevInfo - The info object last time the plugin was invoked.
 * @param {object} newInfo - The info object, to be updated by the method, for this invocation.
 * @param {Function} getTheme - A function to retrieve the current theme.
 * @returns {boolean} <code>true</code> if the width has changed and <code>false</code> otherwise.
 * 
 * @member {plugin} breakpointPlugin
 * @memberof react-viewport-context
 */
const breakpointPlugin = (prevInfo, newInfo, getTheme) => {
  const viewWidth = window.innerWidth
  const { values } = doGetTheme(getTheme).breakpoints
  const newBreakpoint = Object.keys(values).reverse().find((breakpoint) =>
    viewWidth >= values[breakpoint])

  if (newBreakpoint !== prevInfo.breakpoint) {
    newInfo.breakpoint = newBreakpoint
    return true
  }

  return false
}

// add meta information used by ViewportContext to determine what events are necessary to watch.
breakpointPlugin.target = null
breakpointPlugin.attribute = 'breakpoint'
breakpointPlugin.events = ['deviceorientation', 'resize']

export { breakpointPlugin }
