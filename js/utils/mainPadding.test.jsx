/* global afterEach describe Event expect test */
import { mainPaddingStyles } from './mainPadding'

import { defaultTheme } from '../testlib'

import { createTheme } from '@mui/material/styles'

const expected = {
  'Main-padding-sides': {
    '@media (min-width:0px)': { paddingLeft: '0px', paddingRight: '0px' },
    '@media (min-width:600px)': { paddingLeft: '4px', paddingRight: '4px' },
    '@media (min-width:960px)': { paddingLeft: '8px', paddingRight: '8px' },
    '@media (min-width:1280px)': { paddingLeft: '8px', paddingRight: '8px' },
    '@media (min-width:1920px)': { paddingLeft: '8px', paddingRight: '8px' }
  },
  'Main-padding-top': {
    '@media (min-width:0px)': { paddingTop: '0px' },
    '@media (min-width:600px)': { paddingTop: '4px' },
    '@media (min-width:960px)': { paddingTop: '4px' },
    '@media (min-width:1280px)': { paddingTop: '8px' },
    '@media (min-width:1920px)': { paddingTop: '8px' }
  },
  'Main-padding-bottom': {
    '@media (min-width:0px)': { paddingBottom: '0px' },
    '@media (min-width:600px)': { paddingBottom: '4px' },
    '@media (min-width:960px)': { paddingBottom: '8px' },
    '@media (min-width:1280px)': { paddingBottom: '8px' },
    '@media (min-width:1920px)': { paddingBottom: '8px' }
  }
}

const PREFIX='Main-padding'
const classes = {
  mainPaddingTop: PREFIX + '-top',
  mainPaddingSides: PREFIX + '-sides',
  mainPaddingBottom: PREFIX + '-bottom'
}

const theme = createTheme(defaultTheme)

describe("mainPaddingStyles", () => {
  test("generates expected padding styles", () => {
    const styles = mainPaddingStyles(theme, classes)

    expect(styles).toEqual(expected)
  })
})
