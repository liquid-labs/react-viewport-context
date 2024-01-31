const paddingSpec = (spacing, relSpec) => {
  return typeof spacing === 'number'
    ? {
        top    : Math.ceil(spacing * relSpec.top),
        side   : Math.ceil(spacing * relSpec.side),
        bottom : Math.ceil(spacing * relSpec.bottom),
      }
    : {
        top    : Math.ceil(spacing(relSpec.top)),
        side   : Math.ceil(spacing(relSpec.side)),
        bottom : Math.ceil(spacing(relSpec.bottom)),
      }
}

const getMainPaddingSpec = (theme) => {
  const breakpointKeys = theme.breakpoints.keys
  const themeSpec = theme.layout.mainPadding // specifies relative to unit for each breakpoint

  return breakpointKeys.reduce((acc, key) =>
      (acc[key] = paddingSpec(theme.spacing, themeSpec[key]))
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
