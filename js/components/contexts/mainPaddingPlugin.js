import { getMainPaddingSpec } from '../../utils/mainPadding'

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

  // TODO: it's possible nothing has changed; do a deep comparison.
  newInfo.mainPaddingSpec = getMainPaddingSpec(theme)

  return true
}

export { mainPaddingPlugin }
