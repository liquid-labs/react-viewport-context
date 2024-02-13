# react-window-context
[![coverage: 95%](./.readme-assets/coverage.svg)](https://github.com/Liquid-Labs/react-window-context/pulls?q=is%3Apr+is%3Aclosed)

A React provider to track and update on changes to the window, screen, and/or visual viewport.

- [Install](#install)
- [Usage](#usage)
- [Demo](#demo)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [Support](#support)

## Install

    npm i react-window-context

## Usage

Use the `WindowContext` context provider to track and react to updates on `window`, `screen`, and `visualViewport` objects. Exactly what is tracked is controlled by the plugins loaded see the [API reference](#api-reference) for [`makeWindowPlugin()`](#makeWindowPlugin) and friends. All the non-component functions except [`useWindowInfo`](#useWindowInfo) are used to create plugins or a set of plugins.

    import React from 'react'

    import { allWindowPlugins, useWindowInfo, WindowContext } from 'react-window-context'

    // This will track all attributes of the 'window' object (innerWidth, innerHeight, outerWidth, etc.)
    const plugins = allWindowPlugins()

    const WindowInfo = () => {
      const windowInfo = useWindowInfo()

      return (
        <div style={style}>
          {JSON.stringify(viewportInfo.window, null, '  ')}
        </div>
      )
    }

    return (
      <WindowContext plugins={plugins}>
        <WindowInfo />
      </WindowContext>
    )

## Demo

- [Basic window info](https://codepen.io/Zane-Rockenbaugh/pen/RwdqqaJ) (on CodePen)
