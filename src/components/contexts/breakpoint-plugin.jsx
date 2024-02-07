/* eslint jsdoc/require-file-overview:0 */

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
 * Plugin to track whether the <code>window.innerWidth</code> has changed or not.
 * @param {object} prevInfo - The info object last time the plugin was invoked.
 * @param {number} prevInfo.breakpoint - The previous breakpoint setting.
 * @param {object} newInfo - The info object for this invocation..
 * @param {number} newInfo.breakpoint - The new breakpoint setting.
 * @param {Function} getTheme - A function to retrieve the current theme.
 * @returns {boolean} <code>true</code> if the width has changed and <code>false</code> otherwise.
 */
const breakpointPlugin = (prevInfo, newInfo, getTheme) => {
  const viewWidth = window.innerWidth
  const { values } = doGetTheme(getTheme).breakpoints
  const newBreakpoint = Object.keys(values).reverse().find((breakpoint) =>
    viewWidth >= values[breakpoint])

  console.log('innerWidth:', viewWidth, 'newBreakpoint:', newBreakpoint) // DEBUG

  if (newBreakpoint !== prevInfo.breakpoint) {
    newInfo.breakpoint = newBreakpoint
    return true
  }

  return false
}

breakpointPlugin.target = null
breakpointPlugin.attribute = 'breakpoint'
breakpointPlugin.events = ['deviceorientation', 'resize']

export { breakpointPlugin }
