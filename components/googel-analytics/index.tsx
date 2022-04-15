import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '@lib/gtag'

export default function GoogleAnalytics() {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
      />
      <Script
        id="ga"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
       <Script src="https://cdn.bootcss.com/eruda/1.5.8/eruda.min.js"></Script>
       <Script
          id="e"
          dangerouslySetInnerHTML={{
            __html: `
             eruda.init()
          `,
          >
      </Script>
      <Script src="https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js"></Script>
      <Script
        id="vc"
        dangerouslySetInnerHTML={{
          __html: `
          var vConsole = new VConsole();
        `,
      >
      </Script>
    </>
  )
}
