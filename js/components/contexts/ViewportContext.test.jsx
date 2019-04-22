/* global afterEach beforeEach describe expect jest test */
import React from 'react'
import { act, cleanup, fireEvent, render } from 'react-testing-library'
import { ThemeProvider } from '@material-ui/styles'

import { ViewportContext, useViewportInfo } from './ViewportContext'

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

const weirdTheme = {
  breakpoints : {
    keys : ['foo', 'bar', 'baz'],
    values : {
      'foo' : 0,
      'bar' : 82,
      'baz' : 105,
    }
  }
}

const generateTestData = (theme) => {
  const breakpoints = theme.breakpoints.keys
  const boundaryTests = Object.entries(theme.breakpoints.values)
  const subBoundaryTests = boundaryTests.map(([breakpoint, boundary], i) =>
    i === 0 ? null : [ breakpoints[ i - 1 ], boundary - 1 ]).filter(e => e)
  const superBoundaryTests = boundaryTests.map(([breakpoint, boundary], i) =>
    [ breakpoints[ i ], boundary + 1])

  return subBoundaryTests.concat(boundaryTests).concat(superBoundaryTests)
}

const defaultTestData = generateTestData(defaultTheme)
const weirdTestData = generateTestData(weirdTheme)

const ViewListener = ({callback}) => {
  const viewInfo = useViewportInfo()
  callback(viewInfo)

  return <div></div>
}

const breakpointTestFor = (theme) => (breakpoint, boundary) => {
  window.innerWidth = boundary
  let viewInfo
  const callback = (info) => viewInfo = info
  render(
    <ThemeProvider theme={theme}>
      <ViewportContext>
        <ViewListener callback={callback} />
      </ViewportContext>
    </ThemeProvider>
  )
  expect(viewInfo.breakpoint).toBe(breakpoint)
}

describe('ViewportContext', () => {
  afterEach(cleanup)

  describe("using default theme", () => {
    test.each(defaultTestData)
    ("selects '%s' at boundary %d", breakpointTestFor(defaultTheme))
  })

  describe("using weird theme", () => {
    test.each(weirdTestData)
    ("selects '%s' at boundary %d", breakpointTestFor(weirdTheme))
  })

  test("does not provide 'x' by default", () => {
    window.innerWidth = 1200
    let viewInfo
    const callback = (info) => viewInfo = info
    render(
      <ThemeProvider theme={defaultTheme}>
        <ViewportContext>
          <ViewListener callback={callback} />
        </ViewportContext>
      </ThemeProvider>
    )
    expect(viewInfo.x).toBeUndefined()
  })

  test("provides 'viewInfo.x' when requested", () => {
    window.innerWidth = 1200
    let viewInfo
    const callback = (info) => viewInfo = info
    render(
      <ThemeProvider theme={defaultTheme}>
        <ViewportContext provideX>
          <ViewListener callback={callback} />
        </ViewportContext>
      </ThemeProvider>
    )
    expect(viewInfo.x).toBe(1200)
  })

  test("does not re-render when size changes within breakpoint", () => {
    window.innerWidth = 1200
    let renderCount = 0
    let viewInfo
    const callback = (info) => {
      renderCount += 1
      viewInfo = info
    }
    render(
      <ThemeProvider theme={defaultTheme}>
        <ViewportContext>
          <ViewListener callback={callback} />
        </ViewportContext>
      </ThemeProvider>
    )
    expect(renderCount).toBe(1)
    act(() => {
      window.innerWidth = 1205
      window.dispatchEvent(new Event('resize'))
    })
    expect(renderCount).toBe(1)
  })

  test("re-renders when size changes breakpoint", () => {
    window.innerWidth = 1200
    let renderCount = 0
    let viewInfo
    const callback = (info) => {
      renderCount += 1
      viewInfo = info
    }
    render(
      <ThemeProvider theme={defaultTheme}>
        <ViewportContext>
          <ViewListener callback={callback} />
        </ViewportContext>
      </ThemeProvider>
    )
    expect(renderCount).toBe(1)
    act(() => {
      window.innerWidth = 600
      window.dispatchEvent(new Event('resize'))
    })
    expect(viewInfo.breakpoint).toBe('sm')
    expect(renderCount).toBe(2)
  })

  test("rerenders when size changes within breakpoint and 'provideX={true}'", () => {
    window.innerWidth = 1200
    let renderCount = 0
    let viewInfo
    const callback = (info) => {
      renderCount += 1
      viewInfo = info
    }
    render(
      <ThemeProvider theme={defaultTheme}>
        <ViewportContext provideX>
          <ViewListener callback={callback} />
        </ViewportContext>
      </ThemeProvider>
    )
    expect(renderCount).toBe(1)
    act(() => {
      window.innerWidth = 1205
      window.dispatchEvent(new Event('resize'))
    })
    expect(viewInfo.breakpoint).toBe('md')
    expect(viewInfo.x).toBe(1205)
    expect(renderCount).toBe(2)
  })

  test("listeners cleaned up after unmount()", () => {
    window.innerWidth = 1200
    let renderCount = 0
    let viewInfo
    const callback = (info) => {
      renderCount += 1
      viewInfo = info
    }
    const { unmount } = render(
      <ThemeProvider theme={defaultTheme}>
        <ViewportContext provideX>
          <ViewListener callback={callback} />
        </ViewportContext>
      </ThemeProvider>
    )
    expect(renderCount).toBe(1)
    act(() => {
      window.innerWidth = 1205
      window.dispatchEvent(new Event('resize'))
    })
    expect(renderCount).toBe(2)
    unmount()
    act(() => {
      window.innerWidth = 1210
      window.dispatchEvent(new Event('resize'))
    })
    expect(renderCount).toBe(2)
  })
})
