/**
 * @file Defines <code>ViewportContext</code> context component which keeps track of the current breakpoint.
 */
import React, { createContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const ViewportReactContext = createContext()

const INITIAL_STATE = {
  breakpoint : 'xl'
  /* x : <number> */
}

const onResize = (theme, prevTheme, prevInfo, granular, plugins) => {
  const viewWidth = window.innerWidth
  const { keys, values } = theme.breakpoints
  const newInfo = { ...prevInfo }
  let update = false
  const newBreakpoint = keys.slice(0).reverse().find((breakpoint) =>
    viewWidth >= values[breakpoint])
  if (newBreakpoint !== prevInfo.breakpoint || (granular === true && viewWidth !== prevInfo.width)) {
    newInfo.breakpoint = newBreakpoint
    if (granular === true) {
      newInfo.width = viewWidth
    }
    update = true
  }
  plugins.forEach((plugin) => {
    update = plugin(prevInfo, newInfo, prevTheme, theme) || update
  })

  return [update, newInfo]
}

const ViewportContext = ({
  granular = false,
  plugins = [],
  getTheme /* = throw new Error("Must define 'getTheme' attribute.") */,
  children
}) => {
  const theme = getTheme()
  if (!theme) {
    throw new Error("No theme available to 'ViewportContext'. Ensure that 'ViewportContext' is in a 'ThemeProvider' context, and 'ThemeProvider' is initialized with a valid theme.")
  }
  const prevThemeRef = useRef(null)
  const [viewInfo, setViewInfo] = useState(INITIAL_STATE)
  if (viewInfo === INITIAL_STATE) {
    const [update, newInfo] = onResize(theme, prevThemeRef.current, viewInfo, granular, plugins)
    if (update) setViewInfo(newInfo)
  }

  useEffect(() => {
    const listener = () => {
      const [update, newInfo] = onResize(theme, prevThemeRef.current, viewInfo, granular, plugins)
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
    granular : PropTypes.bool,
    plugins  : PropTypes.arrayOf(PropTypes.func),
    getTheme : PropTypes.func
  }
}

export { ViewportContext, ViewportReactContext }
