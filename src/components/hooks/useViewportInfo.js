/**
 * @file Defines the viewport context hook.
 */
import { useContext } from 'react'
import { ViewportReactContext } from '../contexts/ViewportContext' /* eslint-disable-line node/no-missing-import */

const useViewportInfo = () => useContext(ViewportReactContext)

export { useViewportInfo }
