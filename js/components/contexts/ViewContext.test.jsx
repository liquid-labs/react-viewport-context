/* global afterEach beforeEach describe expect jest test */
import React from 'react'
import { act, cleanup, render } from 'react-testing-library'
import { ThemeProvider } from '@material-ui/styles'

import { ViewContext, useViewInfo } from './ViewContext'

// following Material UI default theme 3.9.3
const defaultTheme = {
  breakpoints : {
    keys : ['xs', 'sm', 'md', 'lg', 'xl'],
    values : {
      'xs' : 0,
      'sm' : 600,
      'md' : 960,
      'lg' : 1280,
      'xl' : 1920,
    }
  }
}

const breakpoints = defaultTheme.breakpoints.keys
const boundaryTests = Object.entries(defaultTheme.breakpoints.values)
const subBoundaryTests = boundaryTests.map(([breakpoint, boundary], i) =>
  i === 0 ? null : [ breakpoints[ i - 1 ], boundary - 1 ]).filter(e => e)
const superBoundaryTests = boundaryTests.map(([breakpoint, boundary], i) =>
  [ breakpoints[ i ], boundary + 1])

const ViewListener = ({callback}) => {
  const viewInfo = useViewInfo()
  callback(viewInfo)

  return <div></div>
}

describe('ViewContext', () => {
  afterEach(() => {
    cleanup()
  })

  describe("using default theme", () => {
    test.each(subBoundaryTests.concat(boundaryTests).concat(superBoundaryTests))
    ("selects '%s' at boundary %d", (breakpoint, boundary) => {
      window.innerWidth = boundary
      let viewInfo
      const callback = (info) => viewInfo = info
      render(
        <ThemeProvider theme={defaultTheme}>
          <ViewContext>
            <ViewListener callback={callback} />
          </ViewContext>
        </ThemeProvider>
      )
      expect(viewInfo.breakpoint).toBe(breakpoint)
    })
  })

  test("does not provide 'x' by default", () => {
    window.innerWidth = 1200
    let viewInfo
    const callback = (info) => viewInfo = info
    render(
      <ThemeProvider theme={defaultTheme}>
        <ViewContext>
          <ViewListener callback={callback} />
        </ViewContext>
      </ThemeProvider>
    )
    expect(viewInfo.x).toBeUndefined()
  })
})
