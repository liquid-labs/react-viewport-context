/**
 * @file Defines <code>ViewportContext</code> context component which keeps track of the current breakpoint.
 */
import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ViewportReactContext = createContext()

const INITIAL_STATE = {
  screen         : {},
  visualViewport : {},
  window         : {}
}

const onEvent = ({ getTheme, plugins, viewInfo }) => {
  const newInfo = structuredClone(viewInfo)
  let update = false
  plugins.forEach((plugin) => {
    update = plugin(viewInfo, newInfo, getTheme) || update
  })

  console.log('onEvent; update:', update, 'newInfo:', newInfo) // DEBUG
  return [update, newInfo]
}

const ViewportContext = ({ plugins = [], getTheme, pollInterval = 250, children }) => {
  const [viewInfo, setViewInfo] = useState(INITIAL_STATE)
  if (viewInfo === INITIAL_STATE) {
    const [update, newInfo] = onEvent({ getTheme, plugins, viewInfo })
    if (update) setViewInfo(newInfo)
  }

  useEffect(() => {
    const listener = () => {
      const [update, newInfo] = onEvent({ getTheme, plugins, viewInfo })
      if (update) setViewInfo(newInfo)
    }

    const watchEvents = plugins.reduce((acc, { events }) => {
      for (const event of events) {
        if (!(acc.includes(event))) { acc.push(event) }
      }
      return acc
    }, [])

    const cleanups = []
    for (const event of watchEvents) {
      if (event === 'resize') {
        window.addEventListener('resize', listener)
        cleanups.push(() => window.removeEventListener('resize', listener))
      } else if (event === 'scroll') {
        window.addEventListener('scroll', listener)
        cleanups.push(() => window.removeEventListener('scroll', listener))
      } else if (event === 'deviceorientation') {
        window.addEventListener('deviceorientation', listener)
        cleanups.push(() => window.removeEventListener('deviceorientation', listener))
      } else if (event === 'move') {
        const htmlNode = document.getElementsByTagName('html').item(0)
        let polling

        const onLeave = () => { polling = setInterval(listener, pollInterval) }
        const onEnter = () => clearInterval(polling)

        // tried adding the listener to 'window', but it would have fire 'mouseleave' after entering the page sometime (
        // when crossing the scrollbar, I think)
        htmlNode.addEventListener('mouseleave', onLeave)
        htmlNode.addEventListener('mouseenter', onEnter)

        cleanups.push(() => {
          clearInterval(polling)
          htmlNode.removeEventListener('mouseenter', onEnter)
          htmlNode.removeEventListener('mouseleave', onLeave)
        })
      }
    }
    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [plugins, pollInterval])

  return <ViewportReactContext.Provider value={viewInfo}>
    {children}
  </ViewportReactContext.Provider>
}

if (process.env.NODE_ENV !== 'production') {
  ViewportContext.propTypes = {
    children     : PropTypes.node.isRequired,
    plugins      : PropTypes.arrayOf(PropTypes.func),
    pollInterval : PropTypes.number,
    getTheme     : PropTypes.func
  }
}

export { ViewportContext, ViewportReactContext }
