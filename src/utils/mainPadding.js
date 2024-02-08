/**
 * @file Here we define helper functions to generate the proper style based on 'theme.layout.mainPadding' breakpoint
 * specific spacing factors.
 */

/**
 * Determines the actual pixel paddings given <code>spacing</code> and <code>relSpec</code>.
 * @param {string | Function} spacing - Either a number to be multiplied by each <code>resSpec</code> weighting or a
 *   function which does the same thing
 * @param {object} relSpec - An object representing the relative space (determined by <code>spacing</code>) to apply to
 *   the top, side, and bottom.
 * @param {number} relSpec.bottom - Bottom weighting.
 * @param {number} relSpec.side - Side weighting.
 * @param {number} relSpec.top - Top weighting.
 * @returns {object} An object with actual 'px' settings for <code>top</code>, <code>side</code>, and <code>
 *   bottom</code>.
 * 
 * @memberof react-viewport-context
 */
const paddingSpec = (spacing, relSpec) => {
  return typeof spacing === 'number'
    ? {
        top    : Math.ceil(spacing * relSpec.top) + 'px',
        side   : Math.ceil(spacing * relSpec.side) + 'px',
        bottom : Math.ceil(spacing * relSpec.bottom) + 'px'
      }
    : {
        top    : spacing(relSpec.top),
        side   : spacing(relSpec.side),
        bottom : spacing(relSpec.bottom)
      }
}

const getMainPaddingSpec = (theme) => {
  const breakpointKeys = Object.keys(theme.breakpoints.values)
  const themeSpec = theme.layout.mainPadding // specifies relative to unit for each breakpoint

  return breakpointKeys.reduce((acc, key) =>
    (acc[key] = paddingSpec(theme.spacing, themeSpec[key])) &&
        acc,
  {}
  )
}

const mainPaddingStyles = (theme, classes) => {
  const mainPaddingSpec = getMainPaddingSpec(theme)
  const breakpointKeys = Object.keys(theme.breakpoints.values)
  return {
    [classes.mainPaddingSides] : breakpointKeys.reduce((acc, key) =>
      (acc[theme.breakpoints.up(key)] = {
        paddingLeft  : mainPaddingSpec[key].side,
        paddingRight : mainPaddingSpec[key].side
      }) && acc,
    {}),
    [classes.mainPaddingTop] : breakpointKeys.reduce((acc, key) =>
      (acc[theme.breakpoints.up(key)] = {
        paddingTop : mainPaddingSpec[key].top
      }) && acc,
    {}),
    [classes.mainPaddingBottom] : breakpointKeys.reduce((acc, key) =>
      (acc[theme.breakpoints.up(key)] = {
        paddingBottom : mainPaddingSpec[key].bottom
      }) && acc,
    {})
  }
}

export { getMainPaddingSpec, mainPaddingStyles }
