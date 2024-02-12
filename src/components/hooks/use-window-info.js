import { useContext } from 'react'
import { WindowReactContext } from '../contexts/window-context' /* eslint-disable-line node/no-missing-import */

/**
 * Retrivees the tracked `window`/`screen`/`visualViewport` data.
 * @returns {object} The information object, which has three properties: `window`, `screen`, and `visualViewport`. Any
 * tracked attributes are available on the corresponding property. E.g, the `window`'s inner height is availablee on
 * `window.innerHeight`, etc.`
 */
const useWindowInfo = () => useContext(WindowReactContext)

export { useWindowInfo }
