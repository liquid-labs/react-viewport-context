/**
 * @file Demo page
 */
import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext' /* eslint-disable-line node/no-missing-import */
import Layout from '@theme/Layout' /* eslint-disable-line node/no-missing-import */
/* eslint-disable-next-line node/no-missing-import */
import {
  breakpointPlugin,
  innerWidthPlugin,
  innerHeightPlugin,
  outerWidthPlugin,
  outerHeightPlugin,
  screenXPlugin,
  screenYPlugin,
  scrollXPlugin,
  scrollYPlugin,
  ViewportContext
} from '../components/contexts'
import { useViewportInfo } from '../components/hooks/useViewportInfo'

const testTheme = () => ({
  breakpoints : {
    keys   : ['xs', 'sm', 'md', 'lg', 'xl'],
    values : {
      xs : 0,
      sm : 600,
      md : 900,
      lg : 1200,
      xl : 1536
    }
  }
})

const plugins = [
  breakpointPlugin,
  innerHeightPlugin,
  innerWidthPlugin,
  outerHeightPlugin,
  outerWidthPlugin,
  screenXPlugin,
  screenYPlugin,
  scrollXPlugin,
  scrollYPlugin
]

const ObjectDataDisplay = () => {
  const viewportInfo = useViewportInfo()
  return (
    <div>
      Viewport info:
      <ul>
        {Object.entries(viewportInfo.window).map(([key, value], i) => (<li key={i}>{key}: {value}</li>))}
      </ul>
    </div>
  )
}

export default function Home () {
  const { siteConfig } = useDocusaurusContext()
  return (
  <Layout
      title={siteConfig.title}
      description="Liquid Labs website.">
      <main>
        <ViewportContext getTheme={testTheme} plugins={plugins}>
          <ObjectDataDisplay />
        </ViewportContext>
      </main>
    </Layout>
  )
}
