import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/styles'

const MyContext = createContext()

const useViewportInfo = () => useContext(MyContext)

const INITIAL_STATE = {
  breakpoint : 'xl',
  /* x : <number> */
}

const onResize = (theme, provideX, prevInfo) => {
  const viewWidth = window.innerWidth
  const { keys, values } = theme.breakpoints
  const newInfo = {...prevInfo}
  let update = false
  const newBreakpoint = keys.slice(0).reverse().find((breakpoint, i) =>
    viewWidth >= values[breakpoint])
  if (newBreakpoint !== prevInfo.breakpoint) {
    newInfo.breakpoint = newBreakpoint
    update = true
  }
  if (provideX && viewWidth !== prevInfo.x) {
    newInfo.x = viewWidth
    update = true
  }
  return [update, newInfo]
}

const count = 0

const ViewportContext = ({provideX=false, children}) => {
  const theme = useTheme()
  const [viewInfo, setViewInfo] = useState(INITIAL_STATE)
  if (viewInfo === INITIAL_STATE) {
    const [ update, newInfo ] = onResize(theme, provideX, viewInfo)
    if (update) setViewInfo(newInfo)
  }

  useEffect(() => {
    const listener = () => {
      const [ update, newInfo ] = onResize(theme, provideX, viewInfo)
      if (update) setViewInfo(newInfo)
    }
    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  })

  return <MyContext.Provider value={viewInfo}>
    {children}
  </MyContext.Provider>
}

if (process.env.NODE_ENV !== 'production') {
  ViewportContext.propTypes = {
    children : PropTypes.node.isRequired,
    provideX : PropTypes.bool,
  }
}

export { ViewportContext, useViewportInfo }
