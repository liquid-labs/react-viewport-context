# react-view-context

A React provider to track and update on changes to the window, screen, and/or visual viewport.

## Install

    npm i @liquid-labs/react-view-context

## Usage

Use the `ViewportContext` context provider to track and react to updates on `window`, `screen`, and `visualViewport` objects. Exactly what is tracked is controlled by the plugins loaded, refere to the [API reference](#api-reference) for [`makeWindowPlugin()`](#makeWindowPlugin) and friends. All the non-component functions except [`useViewportInfo`](#useViewportInfo) are used to create plugins or plugin sets.

    import React from 'react'

    import { allWindowPlugins, useViewportInfo, ViewportContext } from '@liquid-labs/react-viewport-context'

    // This will track all attributes of the 'window' object (innerWidth, innerHeight, outerWidth, etc.)
    const plugins = allWindowPlugins()

    const WindowInfo = () => {
      const windowInfo = useViewportInfo()

      return (
        <div style={style}>
          {JSON.stringify(viewportInfo.window, null, '  ')}
        </div>
      )
    }

    return (
      <ViewportContext plugins={plugins}>
        <WindowInfo />
      </ViewportContext>
    )
