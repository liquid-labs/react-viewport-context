/* global afterEach describe Event expect test */
import React from 'react'

import { ThemeProvider } from '@material-ui/styles'
import { ViewportContext } from './ViewportContext'

import { widthPlugin } from './widthPlugin'

import { act, cleanup, render } from 'react-testing-library'
import { ViewListener, defaultTheme } from '../../testlib'

describe('widthPlugin', () => {
  test("provides 'width' when included", () => {
    window.innerWidth = 1200
    let viewInfo
    const callback = (info) => viewInfo = info
    render(
      <ThemeProvider theme={defaultTheme}>
        <ViewportContext plugins={[widthPlugin]}>
          <ViewListener callback={callback} />
        </ViewportContext>
      </ThemeProvider>
    )
    expect(viewInfo.width).toBe(1200)
  })

  test("does not re-render when width does not change", () => {
    window.innerWidth = 1200
    window.innerHeigh = 900
    let renderCount = 0
    let viewInfo
    const callback = (info) => {
      renderCount += 1
      viewInfo = info
    }
    render(
      <ThemeProvider theme={defaultTheme}>
        <ViewportContext plugins={[widthPlugin]}>
          <ViewListener callback={callback} />
        </ViewportContext>
      </ThemeProvider>
    )
    expect(renderCount).toBe(1)
    act(() => {
      window.innerHeight = 800
      window.dispatchEvent(new Event('resize'))
    })
    expect(viewInfo.breakpoint).toBe('md')
    expect(viewInfo.width).toBe(1200)
    expect(renderCount).toBe(1)
  })

  test("triggers rerender when width changes", () => {
    window.innerWidth = 1200
    let renderCount = 0
    let viewInfo
    const callback = (info) => {
      renderCount += 1
      viewInfo = info
    }
    render(
      <ThemeProvider theme={defaultTheme}>
        <ViewportContext plugins={[widthPlugin]}>
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
    expect(viewInfo.width).toBe(1205)
    expect(renderCount).toBe(2)
  })
})
