import { useMemo } from 'react'

const paddingSpec = (spacingUnit, relSpec) => ({
  top    : Math.ceil(relSpec.top * spacingUnit),
  side   : Math.ceil(relSpec.side * spacingUnit),
  bottom : Math.ceil(relSpec.bottom * spacingUnit),
})

const mainPaddingPlugin = (prevInfo, newInfo, prevTheme, theme) => {
  if (prevTheme === theme) return false

  if (process.env.NODE_ENV !== 'production') {
    // verify 'theme' has everything we expect
    Array.isArray(theme?.breakpoints?.keys) ||
      console.error("Provided 'theme' does not define 'breakpoint.keys' as array.")
    theme?.spacing?.unit ||
      console.error("Provided 'theme' does not define 'spacing.unit'.")
    theme?.layout?.mainPadding ||
      console.error("Provided 'theme' does not define 'layout.mainPadding'.")
  }

  const breakpointKeys = theme.breakpoints.keys
  const spacingUnit = theme.spacing.unit // a number in pixels
  const themeSpec = theme.layout.mainPadding // specifies relative to unit for each breakpoint

  const mainPaddingSpec = breakpointKeys.reduce((acc, key) =>
      (acc[key] = paddingSpec(spacingUnit, themeSpec[key]))
        && acc,
    {}
  )
  const mainPaddingStyle = (theme) => ({
    mainPaddingSides : breakpointKeys.reduce((acc, key) =>
      acc[theme.breakpoints.up(key)] = {
        paddingLeft  : `${mainPaddingSpec[key]['side']}px`,
        paddingRight : `${mainPaddingSpec[key]['side']}px`,
      } && acc,
    {}),
    mainPaddingTop : breakpointKeys.reduce((acc, key) =>
      acc[theme.breakpoints.up(key)] = {
        paddingTop  : `${mainPaddingSpec[key]['top']}px`,
      } && acc,
    {}),
    mainPaddingBottom : breakpointKeys.reduce((acc, key) =>
      acc[theme.breakpoints.up(key)] = {
        paddingBottom  : `${mainPaddingSpec[key]['bottom']}px`,
      } && acc,
    {})
  })

  if (prevInfo.mainPaddingSpec !== mainPaddingSpec
      || prevInfo.mainPaddingStyle !== mainPaddingStyle) {
    newInfo.mainPaddingSpec = mainPaddingSpec
    newInfo.mainPaddingStyle = mainPaddingStyle
    return true
  }
  else return false
}

export { mainPaddingPlugin }
