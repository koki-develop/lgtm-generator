import { CacheProvider, EmotionCache } from '@emotion/react';
import { useTheme } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import ToastProvider from '~/components/providers/ToastProvider';
import { useTranslate } from '~/hooks/translateHooks';
import { createEmotionCache } from '~/lib/emotion';

const clientSideEmotionCache = createEmotionCache();

export type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

const App: React.VFC<MyAppProps> = props => {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslate();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STAGE === 'prod') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: router.pathname,
      });
    }
  }, [router.pathname]);

  return (
    <CacheProvider value={emotionCache}>
      <ToastProvider>
        <RecoilRoot>
          <Head>
            <meta name='theme-color' content={theme.palette.primary.main} />
            <meta name='description' content={t.APP_DESCRIPTION} />
            <meta property='og:site_name' content={t.APP_NAME} />
            <meta property='og:title' content={t.APP_NAME} />
            <meta property='og:description' content={t.APP_DESCRIPTION} />
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
            <link
              rel='apple-touch-icon'
              href='https://lgtmgen.org/logo192.png'
            />
            <link rel='manifest' href='https://lgtmgen.org/manifest.json' />
          </Head>
          <Component {...pageProps} />
        </RecoilRoot>
      </ToastProvider>
    </CacheProvider>
  );
};

export default App;
