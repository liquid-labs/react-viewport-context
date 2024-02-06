import React from 'react'

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { ViewportContext } from '../components/contexts/ViewportContext'
import { useViewportInfo } from '../components/hooks/useViewportInfo'

const testTheme = () => ({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      'xs': 0,
      'sm': 600,
      'md': 900,
      'lg': 1200,
      'xl': 1536
    }
  }
})

const ViewportInfo = () => {
  const viewportInfo = useViewportInfo()
  return (
    <pre>
    {JSON.stringify(viewportInfo, null, '  ')}
    </pre>
  )
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
  <Layout
      title={siteConfig.title}
      description="Liquid Labs website.">
      <main>
        <ViewportContext getTheme={testTheme}>
          <ViewportInfo />
        </ViewportContext>
      </main>
    </Layout>
  );
}
