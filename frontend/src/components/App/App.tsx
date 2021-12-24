import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import { createEmotionCache } from '~/lib/emotion';
import ToastProvider from '~/components/providers/ToastProvider';

const clientSideEmotionCache = createEmotionCache();

export type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

const App: React.VFC<MyAppProps> = props => {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const router = useRouter();

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
          <Component {...pageProps} />
        </RecoilRoot>
      </ToastProvider>
    </CacheProvider>
  );
};

export default App;
