const paddingSpec = (spacingUnit, relSpec) => ({
  top    : Math.ceil(relSpec.top * spacingUnit),
  side   : Math.ceil(relSpec.side * spacingUnit),
  bottom : Math.ceil(relSpec.bottom * spacingUnit),
})

const getMainPaddingSpec = (theme) => {
  const breakpointKeys = theme.breakpoints.keys
  const spacingUnit = theme.spacing.unit // a number in pixels
  const themeSpec = theme.layout.mainPadding // specifies relative to unit for each breakpoint

  return breakpointKeys.reduce((acc, key) =>
      (acc[key] = paddingSpec(spacingUnit, themeSpec[key]))
        && acc,
    {}
  )
}

const mainPaddingStyles = (theme) => {
  const mainPaddingSpec = getMainPaddingSpec(theme)
  const breakpointKeys = theme.breakpoints.keys
/*
  console.log(breakpointKeys.reduce((acc, key) =>
    (acc[theme.breakpoints.up(key)] = {
      paddingTop  : `${mainPaddingSpec[key]['top']}px`,
    }) && acc,
  {}))

  return {
    mainPaddingTop : breakpointKeys.reduce((acc, key) =>
      (acc[theme.breakpoints.up(key)] = {
        paddingTop  : `${mainPaddingSpec[key]['top']}px`,
      }) && acc,
    {}),
    mainPaddingBottom : {
      paddingBottom: '5px',
    },
    mainPaddingSides : {
      paddingLeft : '5px',
      paddingRight : '5px'
    }
  }
*/
  return {
    mainPaddingSides : breakpointKeys.reduce((acc, key) =>
      (acc[theme.breakpoints.up(key)] = {
        paddingLeft  : `${mainPaddingSpec[key]['side']}px`,
        paddingRight : `${mainPaddingSpec[key]['side']}px`,
      }) && acc,
    {}),
    mainPaddingTop : breakpointKeys.reduce((acc, key) =>
      (acc[theme.breakpoints.up(key)] = {
        paddingTop  : `${mainPaddingSpec[key]['top']}px`,
      }) && acc,
    {}),
    mainPaddingBottom : breakpointKeys.reduce((acc, key) =>
      (acc[theme.breakpoints.up(key)] = {
        paddingBottom  : `${mainPaddingSpec[key]['bottom']}px`,
      }) && acc,
    {})
  }
}

export { getMainPaddingSpec, mainPaddingStyles }
