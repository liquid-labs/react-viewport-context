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
* `plugins` : provides an array of [plugins](#plugins) which add additional
information.

### `useViewportInfo`

**Context**:
`useViewportInfo` must be used within a `ViewportContext`.

**Result**:

```
{
  breakpoint : <current breakpoint>,
  /* plus fields provide by plugins */
}
```
Where:
* `breakpoint` is derived from the `breakpoints` specification provided from
the theme.

### Plugins

`ViewportContext` takes an optional array of plugins which. Each plugin is a
a function with the signature:

    function (prevInfo, newInfo)

which returns `true` if `newInfo` is modified by the plugin, and `false`
otherwise. See [`widthPlugin`](https://github.com/Liquid-Labs/react-viewport-context/blob/master/js/components/contexts/widthPlugin.js)
for a simple example.

We use plugins rather than properties to optimize bundle size. Plugins are
executed in order and some plugins may rely on previous plugins to avoid
recalculating the same data.

The following plugins are provided as part of the package:

* `widthPlugin` : adds `width` defining the width o the viewport.
