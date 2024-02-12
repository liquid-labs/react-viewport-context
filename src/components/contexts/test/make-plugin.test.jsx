import {
  allPlugins,
  allScreenPlugins,
  allVisualViewportPlugins,
  allWindowPlugins,
  makeScreenPlugin,
  makeVisualViewportPlugin,
  makeWindowPlugin,
  VALID_SCREEN_ATTRIBUTES,
  VALID_VISUAL_VIEWPORT_ATTRIBUTES,
  VALID_WINDOW_ATTRIBUTES
} from '../make-plugin' /* eslint-disable-line node/no-missing-import */

const screenPluginCount = Object.keys(VALID_SCREEN_ATTRIBUTES).length
const visualViewportPluginCount = Object.keys(VALID_VISUAL_VIEWPORT_ATTRIBUTES).length
const windowPluginCount = Object.keys(VALID_WINDOW_ATTRIBUTES).length

const allPluginCount = screenPluginCount + visualViewportPluginCount + windowPluginCount + 1 // for breakpoint plugin

describe('allPlugins', () => {
  test(`creates ${allPluginCount} plugins`, () => expect(allPlugins()).toHaveLength(allPluginCount))
})

describe('allScreenPlugins', () => {
  test(`creates ${screenPluginCount} plugins`, () => expect(allScreenPlugins()).toHaveLength(screenPluginCount))
})

describe('allVisualViewportPlugins', () => {
  test(`creates ${visualViewportPluginCount} plugins`,
    () => expect(allVisualViewportPlugins()).toHaveLength(visualViewportPluginCount))
})

describe('allWindowPlugins', () => {
  test(`creates ${windowPluginCount} plugins`, () => expect(allWindowPlugins()).toHaveLength(windowPluginCount))
})

describe('makeScreenPlugin', () => {
  test.each(['angle', 'availHeight', 'availWidth'])("creates valid plugin for attribute '%s'",
    (attribute) => expect(makeScreenPlugin(attribute)).toBeTruthy())

  test("raises exception on invalid attribute 'innerHeight'",
    () => expect(() => makeScreenPlugin('innerHeight')).toThrow(/No such attribute 'innerHeight'/))
})

describe('makeVisualViewportPlugin', () => {
  test.each(['height', 'offsetLeft', 'offsetTop'])("creates valid plugin for attribute '%s'",
    (attribute) => expect(makeVisualViewportPlugin(attribute)).toBeTruthy())

  test("raises exception on invalid attribute 'innerHeight'",
    () => expect(() => makeVisualViewportPlugin('innerHeight')).toThrow(/No such attribute 'innerHeight'/))
})

describe('makeWindowPlugin', () => {
  test.each(['innerHeight', 'innerWidth', 'outerHeight'])("creates valid plugin for attribute '%s'",
    (attribute) => expect(makeWindowPlugin(attribute)).toBeTruthy())

  test("raises exception on invalid attribute 'angle'",
    () => expect(() => makeWindowPlugin('angle')).toThrow(/No such attribute 'angle'/))

  test.each(['innerHeight', 'innerWidth', 'outerHeight'])(
    "plugin tracks '%s' info on window object and registers changes",
    (attribute) => {
      const plugin = makeWindowPlugin(attribute)
      window[attribute] = 100
      const info = { window : {} }
      const newInfo = structuredClone(info)
      expect(plugin(info, newInfo)).toBe(true)
      expect(newInfo.window[attribute]).toBe(100)
    })

  test.each(['innerHeight', 'innerWidth', 'outerHeight'])("plugin returns false when '%s' is unchanged",
    (attribute) => {
      const plugin = makeWindowPlugin(attribute)
      window[attribute] = 100
      const info = { window : { [attribute] : 100 } }
      const newInfo = structuredClone(info)
      expect(plugin(info, newInfo)).toBe(false)
      expect(newInfo.window[attribute]).toBe(100)
    })
})
