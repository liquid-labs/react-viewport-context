/* global breakpointPlugin makeScreenPlugin */
/**
 * @author Zane Rocknebaugh <zane@liquid-labs.com>
 */
import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ViewportReactContext = createContext()

const INITIAL_STATE = {
  screen         : {},
  visualViewport : {},
  window         : {}
}

/**
 * A context component that tracks information from the `window` and related  objects.
 *
 * The exact information tracked is determanide by the plugins passed to the component. You can use the {@link
 * breakpointPlugin} directly or use {@link makeScreenPlugin} or one of the related  `makePluginX` or group plugin
 * methods to generate plugins for specific data.
 *
 * The `pollInterval` is used when tracking `window.screenX`/`screenY` (or their aliases, `screenLeft` and
 * `screenTop`). Because there is no event that tells us when the browser window (as a whole) is dragged around, we
 * have to check it's position periodically.
 * @param {object} attr - The atributes + children hash object.
 * @param {Function} [attr.getTheme] - A function to retrieve the current theme. This is used by {@link
 *   module:react-viewport-context.breakpointPlugin} and required if that (or another custom plugin utilizing the
 *   theme) is used.
 * @param {Function[]} attr.plugins - An array of plugin functions which determine what data is extracted (and what
 *   data determines the update cycle).
 * @param {number} [attr.pollInterval] - The amount of time in ms to wait between polling for the window location
 *   (see function description).
 * @param {object} attr.children - The child elements passed in from the content of the component.
 * @returns {object} The rendered component.
 */
const ViewportContext = ({ getTheme, plugins = [], pollInterval = 250, children }) => {
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

ViewportContext.propTypes = {
  children     : PropTypes.node.isRequired,
  plugins      : PropTypes.arrayOf(PropTypes.func).isRequired,
  pollInterval : PropTypes.number,
  getTheme     : PropTypes.func
}

/**
 * Helper function which processes the `plugins` and returns whether updates where made and the new context info object.
 * @param {object} args - The arguments inpush object.
 * @param {Function} args.getTheme - The method to retrieve the current theme.
 * @param {Function[]} args.plugins - The plugins to activate.
 * @param {object} args.viewInfo - The current data/state tracker.
 * @returns {Array} Returns a `boolean` update indicator in position one and the new info/data state object in position
 *  1.
 * @private
 */
const onEvent = ({ getTheme, plugins, viewInfo }) => {
  const newInfo = structuredClone(viewInfo)
  let update = false
  plugins.forEach((plugin) => {
    update = plugin(viewInfo, newInfo, getTheme) || update
  })

  return [update, newInfo]
}

export { ViewportContext, ViewportReactContext }
