/**
 * @file Demo page
 */
import React from 'react'


import { breakpointPlugin } from '../components/contexts/breakpointPlugin'
import {
  makeScreenPlugin,
  makeVisualViewportPlugin,
  makeWindowPlugin,
  VALID_SCREEN_ATTRIBUTES,
  VALID_VISUAL_VIEWPORT_ATTRIBUTES,
  VALID_WINDOW_ATTRIBUTES
} from '../components/contexts/make-plugin'
import { ViewportContext } from '../components/contexts/ViewportContext'
import { useViewportInfo } from '../components/hooks/useViewportInfo'

const testTheme = () => ({
  breakpoints : {
    values : {
      xs : 0,
      sm : 600,
      md : 900,
      lg : 1200,
      xl : 1536
    }
  }
})

const screenPlugins = Object.keys(VALID_SCREEN_ATTRIBUTES).map((attribute) => makeScreenPlugin(attribute))

const visualViewportPlugins = Object.keys(VALID_VISUAL_VIEWPORT_ATTRIBUTES).map((attribute) => 
  makeVisualViewportPlugin(attribute))

const windowPlugins = Object.keys(VALID_WINDOW_ATTRIBUTES).map((attribute) => makeWindowPlugin(attribute))

const plugins = [breakpointPlugin, ...screenPlugins, ...visualViewportPlugins, ...windowPlugins]


const BreakpointDisplay = () => {
  const viewportInfo = useViewportInfo()
  return (<div>Breakpoint: {viewportInfo.breakpoint}</div>)
}

const ObjectDataDisplay = ({ target }) => {
  const viewportInfo = useViewportInfo()
  return (
    <div>
      {target} info:
      <ul>
        {Object.entries(viewportInfo[target]).map(([key, value], i) => (<li key={i}>{key}: {value}</li>))}
      </ul>
    </div>
  )
}

export default function Home () {
  return (
    <main style={{paddingTop: '30vh', margin: '0 auto'}}>
      <ViewportContext getTheme={testTheme} plugins={plugins}>
        <BreakpointDisplay />
        <ObjectDataDisplay target="screen" />
        <ObjectDataDisplay target="visualViewport" />
        <ObjectDataDisplay target="window" />
      </ViewportContext>
    </main>
  )
}
