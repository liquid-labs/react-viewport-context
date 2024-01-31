/* global afterEach describe Event expect test */
import React from 'react'
import classNames from 'classnames'

import { mainPaddingStyles } from './mainPadding'

import { cleanup, render } from 'react-testing-library'
import { defaultTheme } from '../testlib'

import { SheetsRegistry } from 'jss'

import { createTheme } from '@mui/material/styles'
import { makeStyles, StylesProvider, ThemeProvider } from '@mui/styles'

const useMainPaddingStyles = makeStyles(mainPaddingStyles)

const TestMain = (props) => {
  const classes = useMainPaddingStyles()
  const className = classNames(
    classes.mainPaddingTop,
    classes.mainPaddingSides,
    classes.mainPaddingBottom)

  return <div className={className} {...props}>Hi!</div>
}

const defaultMuiTheme = createTheme(defaultTheme)

describe("mainPaddingStyles", () => {
  afterEach(cleanup)

  test("generates expected padding styles", () => {
    const sheets = new SheetsRegistry()

    const { getByTestId } = render(
      <StylesProvider sheetsRegistry={sheets}>
        <ThemeProvider theme={defaultMuiTheme}>
            <TestMain data-testid='main'/>
        </ThemeProvider>
      </StylesProvider>
    )

    expect(sheets.toString()).toMatchSnapshot()
  })
})
