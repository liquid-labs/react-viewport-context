import React, { createContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { useTheme } from '@mui/material/styles'

const ViewportReactContext = createContext()

const INITIAL_STATE = {
  breakpoint : 'xl',
  /* x : <number> */
}

const onResize = (theme, prevTheme, prevInfo, plugins) => {
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
  plugins.forEach((plugin) => {
    update = plugin(prevInfo, newInfo, prevTheme, theme) || update
  })

  return [update, newInfo]
}

const ViewportContext = ({plugins=[], children}) => {
  const theme = useTheme()
  if (!theme) {
    throw new Error("No theme available to 'ViewportContext'. Ensure that 'ViewportContext' is in a 'ThemeProvider' context, and 'ThemeProvider' is initialized with a valid theme.")
  }
  const prevThemeRef = useRef(null)
  const [viewInfo, setViewInfo] = useState(INITIAL_STATE)
  if (viewInfo === INITIAL_STATE) {
    const [ update, newInfo ] = onResize(theme, prevThemeRef.current, viewInfo, plugins)
    if (update) setViewInfo(newInfo)
  }

  useEffect(() => {
    const listener = () => {
      const [ update, newInfo ] = onResize(theme, prevThemeRef.current, viewInfo, plugins)
      if (update) setViewInfo(newInfo)
    }
    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  })
  prevThemeRef.current = theme

  return <ViewportReactContext.Provider value={viewInfo}>
    {children}
  </ViewportReactContext.Provider>
}

if (process.env.NODE_ENV !== 'production') {
  ViewportContext.propTypes = {
    children : PropTypes.node.isRequired,
    plugins : PropTypes.arrayOf(PropTypes.func),
  }
}

export { ViewportContext, ViewportReactContext }
