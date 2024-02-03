/* global afterEach describe Event expect test */
import React from 'react'

import { ThemeProvider } from '@mui/material/styles'
import { ViewportContext } from './ViewportContext'

import { mainPaddingPlugin } from './mainPaddingPlugin'

import { act, cleanup, render } from '@testing-library/react'
import { ViewListener, defaultTheme, weirdTheme } from '../../testlib'

// TODO https://github.com/Liquid-Labs/react-viewport-context/issues/2

describe('mainPaddingPlugin', () => {
  test("provides 'mainPaddingSpec' when included", () => {
    window.innerWidth = 1200
    let viewInfo
    const callback = (info) => viewInfo = info
    render(
      <ThemeProvider theme={defaultTheme}>
        <ViewportContext plugins={[mainPaddingPlugin]}>
          <ViewListener callback={callback} />
        </ViewportContext>
      </ThemeProvider>
    )

    expect(viewInfo.mainPaddingSpec).toBeTruthy()
    expect(viewInfo.mainPaddingSpec.xs.top).toBe('0px')
    expect(viewInfo.mainPaddingSpec.lg.side).toBe('8px')
  })

  test("does not trigger re-render when theme unchanged", () => {
    window.innerWidth = 1200
    let renderCount = 0
    let viewInfo
    const callback = (info) => {
      renderCount += 1
      viewInfo = info
    }
    render(
      <ThemeProvider theme={defaultTheme}>
        <ViewportContext plugins={[mainPaddingPlugin]}>
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

  test("rerenders when theme changes", () => {
    window.innerWidth = 1200
    let renderCount = 0
    let viewInfo
    const callback = (info) => {
      renderCount += 1
      viewInfo = info
    }
    const { rerender } = render(
      <ThemeProvider theme={defaultTheme}>
        <ViewportContext plugins={[mainPaddingPlugin]}>
          <ViewListener callback={callback} />
        </ViewportContext>
      </ThemeProvider>
    )
    expect(renderCount).toBe(1)
    rerender(
      <ThemeProvider theme={weirdTheme}>
        <ViewportContext plugins={[mainPaddingPlugin]}>
          <ViewListener callback={callback} />
        </ViewportContext>
      </ThemeProvider>
    )
    expect(renderCount).toBe(2)
  })
})
