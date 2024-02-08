/**
 * @file Demo page
 */
import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext' /* eslint-disable-line node/no-missing-import */
import Layout from '@theme/Layout' /* eslint-disable-line node/no-missing-import */
/* eslint-disable-next-line node/no-missing-import */
import { allPlugins } from '../components/contexts/make-plugin'
import { ViewportContext } from '../components/contexts/ViewportContext'
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

const plugins = allPlugins()

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
