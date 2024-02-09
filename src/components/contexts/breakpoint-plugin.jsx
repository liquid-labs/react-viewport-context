/**
 * Retrieves the theme and verifies that it is structurally correct. See {@link
 * module:react-viewport-context.breakpointPlugin} for the required structure.
 * @param getTheme
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
 * Plugin to track whether the current theme 'breakpoint' and whether it has changed or not. This method works with
 * with [Material UI](https://mui.com/material-ui/) themes or any theme that provide a `breakpoint` definition (see
 * example). Note, the typical breakpoints are 'xs', 'sm', 'md', 'lg', 'xl', but in practice can be anything.
 * @example
 * const getTheme = () => ({
 *   breakpoints: {
 *     values: {
 *       key1: 0, // cuttoff in pixels above which the breakpoint is activated
 *       key2: 100,
 *     }
 *   }
 * })
 * const info = { windew: { innerWidth: 100 }}
 * const newInfo = structuredClone(info)
 * console.log(breakpointPlugin(info, newInfo, getTheme)) // prints: 'key2'
 * @param {object} prevInfo - The info object last time the plugin was invoked.
 * @param {object} newInfo - The info object, to be updated by the method, for this invocation.
 * @param {Function} getTheme - A function to retrieve the current theme.
 * @returns {boolean} `true` if the width has changed and `false` otherwise.
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
