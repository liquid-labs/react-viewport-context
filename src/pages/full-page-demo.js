/**
 * @file Demo page
 */
import React from 'react'
import PropTypes from 'prop-types'

import { allPlugins } from '../components/contexts/make-plugin' /* eslint-disable-line node/no-missing-import */
/* eslint-disable-next-line node/no-missing-import */
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

if (process.env.NODE_ENV !== 'production') {
  ObjectDataDisplay.propTypes = {
    target : PropTypes.string.isRequired
  }
}

const AllDemo = () => (
  <main style={{ paddingTop : '30vh', margin : '0 auto' }}>
    <ViewportContext getTheme={testTheme} plugins={allPlugins()}>
      <BreakpointDisplay />
      <ObjectDataDisplay target="screen" />
      <ObjectDataDisplay target="visualViewport" />
      <ObjectDataDisplay target="window" />
    </ViewportContext>
  </main>
)

export default AllDemo
