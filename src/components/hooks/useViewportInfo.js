/**
 * @file Defines the viewport context hook.
 */
import { useContext } from 'react'
import { ViewportReactContext } from '../contexts/ViewportContext' /* eslint-disable-line node/no-missing-import */

/**
 * Retrivees the tracked `window`/`screen`/`visualViewport` data.
 * @returns {object} The information object, which has three properties: `window`, `screen`, and `visualViewport`. Any
 * tracked attributes are available on the corresponding property. E.g, the `window`'s inner height is availablee on
 * `window.innerHeight`, etc.`
 */
const useViewportInfo = () => useContext(ViewportReactContext)

export { useViewportInfo }
