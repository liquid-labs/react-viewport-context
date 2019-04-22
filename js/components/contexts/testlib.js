import React from 'react'
import PropTypes from 'prop-types'

import { useViewportInfo } from '../hooks/useViewportInfo'

// following Material UI default theme 3.9.3
const defaultTheme = {
  breakpoints : {
    keys   : ['xs', 'sm', 'md', 'lg', 'xl'],
    values : {
      'xs' : 0,
      'sm' : 600,
      'md' : 960,
      'lg' : 1280,
      'xl' : 1920,
    }
  }
}

const weirdTheme = {
  breakpoints : {
    keys   : ['foo', 'bar', 'baz'],
    values : {
      'foo' : 0,
      'bar' : 82,
      'baz' : 105,
    }
  }
}

const ViewListener = ({callback}) => {
  const viewInfo = useViewportInfo()
  callback(viewInfo)

  return <div />
}

ViewListener.propTypes = {
  callback : PropTypes.func.isRequired
}

export { ViewListener, defaultTheme, weirdTheme }
