import React from 'react';
import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {process.env.NEXT_PUBLIC_STAGE === 'prod' && (
            <>
              {/* Global site tag (gtag.js) - Google Analytics */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              ></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                  `,
                }}
              ></script>
            </>
          )}

          <meta name='theme-color' content='#1E90FF' />
          <meta
            name='description'
            content='シンプルな LGTM 画像作成サービスです。'
          />
          <meta property='og:site_name' content='LGTM Generator' />
          <meta property='og:title' content='LGTM Generator' />
          <meta
            property='og:description'
            content='シンプルな LGTM 画像作成サービスです。'
          />
          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://lgtmgen.org' />
          <meta property='og:image' content='https://lgtmgen.org/card.png' />
          <meta
            property='og:image:secure_url'
            content='https://lgtmgen.org/card.png'
          />
          <meta property='og:image:width' content='600' />
          <meta property='og:image:height' content='314' />
          <meta property='og:locale' content='ja_JP' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@koki_develop' />
          <meta property='fb:app_id' content='889570964422469' />
          <link rel='icon' href='https://lgtmgen.org/favicon.ico' />
          <link rel='apple-touch-icon' href='https://lgtmgen.org/logo192.png' />
          <link rel='manifest' href='https://lgtmgen.org/manifest.json' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await NextDocument.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
