import React from 'react' /* eslint-disable-line no-unused-vars */
import PropTypes from 'prop-types'

import { useWindowInfo } from '../components/hooks/use-window-info'

// following Material UI default theme 3.9.3
const defaultTheme = {
  breakpoints : {
    values : {
      xs : 0,
      sm : 600,
      md : 960,
      lg : 1280,
      xl : 1920
    }
  },
  spacing    : 8,
  typography : { useNextVariants : true },
  layout     : {
    mainPadding : {
      xs : {
        top    : 0,
        side   : 0,
        bottom : 0
      },
      sm : {
        top    : 0.5,
        side   : 0.5,
        bottom : 0.5
      },
      md : {
        top    : 0.5,
        side   : 1,
        bottom : 1
      },
      lg : {
        top    : 1,
        side   : 1,
        bottom : 1
      },
      xl : {
        top    : 1,
        side   : 1,
        bottom : 1
      }
    }
  }
}

const weirdTheme = {
  breakpoints : {
    values : {
      foo : 0,
      bar : 82,
      baz : 105
    }
  },
  spacing    : 5,
  typography : { useNextVariants : true },
  layout     : {
    mainPadding : {
      xs : {
        top    : 0.3,
        side   : 0.1,
        bottom : 4
      },
      sm : {
        top    : 0.5,
        side   : 0.25,
        bottom : 0.5
      },
      md : {
        top    : 0.5,
        side   : 1,
        bottom : 1
      },
      lg : {
        top    : 1,
        side   : 1,
        bottom : 1
      },
      xl : {
        top    : 1,
        side   : 1,
        bottom : 1
      }
    }
  }
}

const ViewListener = ({ callback }) => {
  const viewInfo = useWindowInfo()

  callback(viewInfo)

  return <div />
}

ViewListener.propTypes = {
  callback : PropTypes.func.isRequired
}

export { ViewListener, defaultTheme, weirdTheme }
