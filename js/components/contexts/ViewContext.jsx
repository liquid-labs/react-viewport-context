import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/styles'

const MyContext = createContext()

const useViewInfo = () => useContext(MyContext)

const INITIAL_STATE = {
  breakpoint : 'xl',
  /* x : <number> */
}

const ViewContext = ({provideX=false, children}) => {
  const [viewInfo, setViewInfo] = useState(INITIAL_STATE)
  const theme = useTheme()

  const onResize = useCallback(() => {
    const viewWidth = window.innerWidth
    const { keys, values } = theme.breakpoints
    const newInfo = {...viewInfo}
    let update = false
    const newBreakpoint = keys.slice(0).reverse().find((breakpoint, i) =>
      viewWidth >= values[breakpoint])
    if (newBreakpoint !== viewInfo.breakpoint) {
      newInfo.breakpoint = newBreakpoint
      update = true
    }
    if (provideX && viewWidth !== viewInfo.x) {
      newInfo.x = viewWidth
      update = true
    }
    if (update) setViewInfo(newInfo)
  }, [ provideX, setViewInfo ])

  useEffect(() => {
    const resizeListener = window.addEventListener('resize', onResize)
    onResize()

    return () => window.removeEventListener('resize', resizeListener)
  }, [])

  return <MyContext.Provider value={viewInfo}>
    {children}
  </MyContext.Provider>
}

if (process.env.NODE_ENV !== 'production') {
  ViewContext.propTypes = {
    children : PropTypes.node.isRequired,
    provideX : PropTypes.bool,
  }
}

export { ViewContext, useViewInfo }
