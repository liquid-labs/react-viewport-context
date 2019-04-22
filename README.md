# react-view-context

A react Provider with hook to get viewport info and subscribe to changes.

## Install

    npm i @liquid-labs/react-view-context

## Usage

    import React from 'react'

    import { ThemeProvider } from '@material-ui/styles'
    import { ViewportContext, useViewportInfo } from '@liquid-labs/react-viewport-context'

    const SillyDemo = () => {
      const viewportInfo = useViewportInfo()
      const style = {
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
      }

      return <div style={style}>
          Breakpoint: {viewportInfo.breakpoint}
        </div>
    }

    <ThemeProvider theme={theme}
      <ViewportContext>
        <SillyDemo />
      </ViewportContext>
    </ThemeProvider>

## API

### `ViewportContext`

**Context**:
`ViewportContext` must currently be within in a `ThemeProvider` context (see
[issue #1](https://github.com/Liquid-Labs/react-viewport-context/issues/1)). The
theme must include a `breakpoints` field:

```
breakpoints : {
  keys : [...array of strings...],
  values : { /* for each key */
    <key from array> : <numeric breakpoint>
  }
}
```
**Properties**:
* `provideX` : if true, then `useViewportInfo` will provide the current viewport
width on field `x`.

### `useViewportInfo`

**Context**:
`useViewportInfo` must be used within a `ViewportContext`.

**Result**:

```
{
  breakpoint : <current breakpoint>,
  x : /*optional*/ <number>
}
```
Where:
* `breakpoint` is derived from the `breakpoints` specification provided from
the theme.
* `x` is the current viewport width.
