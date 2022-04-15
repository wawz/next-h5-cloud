

import Document, { Html, Head, Main, NextScript } from "next/document";


export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script async src="https://cdn.bootcss.com/eruda/1.5.8/eruda.min.js" />
          <script
            id="druda"
            async
            dangerouslySetInnerHTML={{
              __html: `
            window.eruda.init();
          `,
            }}
          />
          <script async src="https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js" />
          {/* <script
            id="druda"
            async
            dangerouslySetInnerHTML={{
              __html: `
              var vConsole = new VConsole();
            `,
            }}
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}