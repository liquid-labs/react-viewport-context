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


##  API Reference

- Constants:
  - [`VALID_SCREEN_ATTRIBUTES`](#VALID_SCREEN_ATTRIBUTES): Object defining the valid `screen` attributes.
  - [`VALID_VISUAL_VIEWPORT_ATTRIBUTES`](#VALID_VISUAL_VIEWPORT_ATTRIBUTES): Object defining the valid `visualViewport` attributes.
  - [`VALID_WINDOW_ATTRIBUTES`](#VALID_WINDOW_ATTRIBUTES): Object defining the valid `window` attributes.
- Components:
  - [`ViewportContext`](#ViewportContext): A context component that tracks information from the `window` and related  objects.
- Functions:
  - [`allPlugins()`](#allPlugins): Convenience method to track all data for `window`, `screen`, and `visualViewport`.
  - [`allScreenPlugins()`](#allScreenPlugins): Convenience method to create all `screen` related plugins.
  - [`allVisualViewportPlugins()`](#allVisualViewportPlugins): Convenience method to create all `visualViewport` related plugins.
  - [`allWindowPlugins()`](#allWindowPlugins): Convenience method to create all `screen` related plugins.
  - [`breakpointPlugin()`](#breakpointPlugin): Plugin to track whether the current theme 'breakpoint' and whether it has changed or not.
  - [`makeScreenPlugin()`](#makeScreenPlugin): Function to generate plugins to extract `screen` related data.
  - [`makeVisualViewportPlugin()`](#makeVisualViewportPlugin): Function to generate plugins to extract `visualViewport` related data.
  - [`makeWindowPlugin()`](#makeWindowPlugin): Function to generate plugins to extract `window` related data.
  - [`useViewportInfo()`](#useViewportInfo): Retrivees the tracked `window`/`screen`/`visualViewport` data.

<a id="VALID_SCREEN_ATTRIBUTES"></a>
### `VALID_SCREEN_ATTRIBUTES`

Object defining the valid `screen` attributes. Also defines associated events that might cause a change in the value 
of each attribute.


[**Source code**](./src/components/contexts/make-plugin.jsx#L53)

<a id="VALID_VISUAL_VIEWPORT_ATTRIBUTES"></a>
### `VALID_VISUAL_VIEWPORT_ATTRIBUTES`

Object defining the valid `visualViewport` attributes. Also defines associated events that might cause a change in 
the value of each attribute.


[**Source code**](./src/components/contexts/make-plugin.jsx#L68)

<a id="VALID_WINDOW_ATTRIBUTES"></a>
### `VALID_WINDOW_ATTRIBUTES`

Object defining the valid `window` attributes. Also defines  associated events that might cause a change in the 
value of each attribute.


[**Source code**](./src/components/contexts/make-plugin.jsx#L83)

<a id="ViewportContext"></a>
### `ViewportContext`

A context component that tracks information from the `window` and related  objects.

The exact information tracked is determanide by the plugins passed to the component. You can use the [breakpointPlugin](#breakpointPlugin) directly or use [makeScreenPlugin](#makeScreenPlugin) or one of the related  `makePluginX` or group plugin 
methods to generate plugins for specific data.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [attr.getTheme] | `function` |  | A function to retrieve the current theme. This is used by [module:react-viewport-context.breakpointPlugin](module:react-viewport-context.breakpointPlugin) and required if that (or another custom plugin utilizing the    theme) is used. || attr.plugins | `Array.<function()>` |  | An array of plugin functions which determine what data is extracted (and what    data determines the update cycle). || [attr.pollInterval] | `number` | `250` | The amount of time in ms to wait between polling for the window location    (see function description). || cont.children | `node` |  | The child elements passed in from the content of the component. |


[**Source code**](./src/components/contexts/ViewportContext.jsx#L32)

<a id="allPlugins"></a>
### `allPlugins()` ⇒ `Array.<function()>`

Convenience method to track all data for `window`, `screen`, and `visualViewport`.

**Returns**: `Array.<function()>` - An array of [ViewportContext](#ViewportContext) plugins.


**See**: [allWindowPlugins](#allWindowPlugins) for an example.  

[**Source code**](./src/components/contexts/make-plugin.jsx#L175)

<a id="allScreenPlugins"></a>
### `allScreenPlugins()` ⇒ `Array.<function()>`

Convenience method to create all `screen` related plugins.

**Returns**: `Array.<function()>` - An array of [ViewportContext](#ViewportContext) plugins.


**See**: [allWindowPlugins](#allWindowPlugins) for an example.  

[**Source code**](./src/components/contexts/make-plugin.jsx#L143)

<a id="allVisualViewportPlugins"></a>
### `allVisualViewportPlugins()` ⇒ `Array.<function()>`

Convenience method to create all `visualViewport` related plugins.

**Returns**: `Array.<function()>` - An array of [ViewportContext](#ViewportContext) plugins.


**See**: [allWindowPlugins](#allWindowPlugins) for an example.  

[**Source code**](./src/components/contexts/make-plugin.jsx#L151)

<a id="allWindowPlugins"></a>
### `allWindowPlugins()` ⇒ `Array.<function()>`

Convenience method to create all `screen` related plugins.

**Returns**: `Array.<function()>` - An array of [ViewportContext](#ViewportContext) plugins.

**Example**  
```js
const allWindowPlugins = allWindowPlugins()

return (
  <ViewportContext plugins={allWindowPlugins}>
    <DisplayAllWindowData />
  </ViewportContext>
)
```

[**Source code**](./src/components/contexts/make-plugin.jsx#L167)

<a id="breakpointPlugin"></a>
### `breakpointPlugin(prevInfo, newInfo, getTheme)` ⇒ `boolean`

Plugin to track whether the current theme 'breakpoint' and whether it has changed or not. This method works with 
with [Material UI](https://mui.com/material-ui/) themes or any theme that provide a `breakpoint` definition (see 
example). Note, the typical breakpoints are 'xs', 'sm', 'md', 'lg', 'xl', but in practice can be anything.


| Param | Type | Description |
| --- | --- | --- |
| prevInfo | `object` | The info object last time the plugin was invoked. || newInfo | `object` | The info object, to be updated by the method, for this invocation. || getTheme | `function` | A function to retrieve the current theme. |

**Returns**: `boolean` - `true` if the width has changed and `false` otherwise.

**Example**  
```js
const getTheme = () => ({ 
  breakpoints: {
    values: {
      key1: 0, // cuttoff in pixels above which the breakpoint is activated
      key2: 100,
    }
  }
})
const info = { windew: { innerWidth: 100 }}
const newInfo = structuredClone(info)
console.log(breakpointPlugin(info, newInfo, getTheme)) // prints: 'key2'
```

[**Source code**](./src/components/contexts/breakpoint-plugin.jsx#L44)

<a id="makeScreenPlugin"></a>
### `makeScreenPlugin(attribute)` ⇒ `function`

Function to generate plugins to extract `screen` related data.


| Param | Type | Description |
| --- | --- | --- |
| attribute | `string` | The `screen` attribute to track. |

**Returns**: `function` - A [ViewportContext](#ViewportContext) plugin.

**Throws**: Function to generate plugins to extract `screen` related data.


**See**:
- [VALID_SCREEN_ATTRIBUTES](#VALID_SCREEN_ATTRIBUTES) for valid attributes.
- [makeWindowPlugin](#makeWindowPlugin) for an example.

[**Source code**](./src/components/contexts/make-plugin.jsx#L105)

<a id="makeVisualViewportPlugin"></a>
### `makeVisualViewportPlugin(attribute)` ⇒ `function`

Function to generate plugins to extract `visualViewport` related data.


| Param | Type | Description |
| --- | --- | --- |
| attribute | `string` | The `visualViewport` attribute to track. |

**Returns**: `function` - A [ViewportContext](#ViewportContext) plugin.

**Throws**: Function to generate plugins to extract `visualViewport` related data.


**See**:
- [VALID_VISUAL_VIEWPORT_ATTRIBUTES](#VALID_VISUAL_VIEWPORT_ATTRIBUTES) for valid attributes.
- [makeWindowPlugin](#makeWindowPlugin) for an example.

[**Source code**](./src/components/contexts/make-plugin.jsx#L116)

<a id="makeWindowPlugin"></a>
### `makeWindowPlugin(attribute)` ⇒ `function`

Function to generate plugins to extract `window` related data.


| Param | Type | Description |
| --- | --- | --- |
| attribute | `string` | The `window` attribute to track. |

**Returns**: `function` - A [ViewportContext](#ViewportContext) plugin.

**Throws**: Function to generate plugins to extract `window` related data.

**Example**  
```js
const innerHeightPlugin = makeWindowPlugin('innerHeight')

return (
  <ViewportContext plugins={[innerHeightPlugin]}>
    <DisplayInnerHeight />
  </ViewportContext>
)
```

**See**: [VALID_WINDOW_ATTRIBUTES](#VALID_WINDOW_ATTRIBUTES) for valid attributes.  

[**Source code**](./src/components/contexts/make-plugin.jsx#L135)

<a id="useViewportInfo"></a>
### `useViewportInfo()` ⇒ `object`

Retrivees the tracked `window`/`screen`/`visualViewport` data.

**Returns**: `object` - The information object, which has three properties: `window`, `screen`, and `visualViewport`. Any 
tracked attributes are available on the corresponding property. E.g, the `window`'s inner height is availablee on 
`window.innerHeight`, etc.`


[**Source code**](./src/components/hooks/useViewportInfo.js#L14)

