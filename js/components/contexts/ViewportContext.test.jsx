/* global afterEach describe Event expect test */
import React from 'react'

import { ThemeProvider } from '@material-ui/styles'
import { ViewportContext } from './ViewportContext'

import { act, cleanup, render } from 'react-testing-library'
import { ViewListener, defaultTheme, weirdTheme } from './testlib'

const generateTestData = (theme) => {
  const breakpoints = theme.breakpoints.keys
  const boundaryTests = Object.entries(theme.breakpoints.values)
  const subBoundaryTests = boundaryTests.map(([breakpoint, boundary], i) =>
    i === 0 ? null : [ breakpoints[ i - 1 ], boundary - 1 ]).filter(e => e)
  const superBoundaryTests = boundaryTests.map(([breakpoint, boundary], i) =>
    [ breakpoints[ i ], boundary + 1 ])

  return subBoundaryTests.concat(boundaryTests).concat(superBoundaryTests)
}

const defaultTestData = generateTestData(defaultTheme)
const weirdTestData = generateTestData(weirdTheme)

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
    test.each(defaultTestData)("selects '%s' at boundary %d",
      breakpointTestFor(defaultTheme))
  })

  describe("using weird theme", () => {
    test.each(weirdTestData)("selects '%s' at boundary %d",
      breakpointTestFor(weirdTheme))
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

  test("does not re-render when size changes, but breakpoint does not", () => {
    window.innerWidth = 1200
    let renderCount = 0
    const callback = (info) => renderCount += 1

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

  test("listeners cleaned up after unmount()", () => {
    const currListeners = {}
    const realAddEventListener = window.addEventListener
    window.addEventListener = (eventType, listener) => {
      realAddEventListener(eventType, listener)
      if (currListeners[eventType] === undefined) {
        currListeners[eventType] = []
      }
      currListeners[eventType].push(listener)
    }
    const realRemoveEventListener = window.removeEventListener
    window.removeEventListener = (eventType, listener) => {
      realRemoveEventListener(eventType, listener)
      const eventListeners = currListeners[eventType]
      if (eventListeners) {
        const listenerIndex = eventListeners.indexOf(listener)
        if (listenerIndex !== -1) {
          eventListeners.splice(listener, 1)
          if (eventListeners.length === 0) delete currListeners[eventType]
        }
      }
    }
    window.innerWidth = 1200
    let renderCount = 0
    const callback = (info) => renderCount += 1

    const { unmount } = render(
      <ThemeProvider theme={defaultTheme}>
        <ViewportContext>
          <ViewListener callback={callback} />
        </ViewportContext>
      </ThemeProvider>
    )
    expect(currListeners.resize.length).toBe(1)

    unmount()

    expect(currListeners.resize).toBeUndefined()
  })
})
