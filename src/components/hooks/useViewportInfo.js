import { useContext } from 'react'
import { ViewportReactContext } from '../contexts/ViewportContext'

const useViewportInfo = () => useContext(ViewportReactContext)

export { useViewportInfo }
