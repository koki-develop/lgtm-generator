import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { theme } from '@/components/Layout/theme';
import ToastProvider from '@/components/providers/ToastProvider';
import { createEmotionCache } from '@/lib/emotion';

const clientSideEmotionCache = createEmotionCache();

export type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

const App: React.FC<MyAppProps> = props => {
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastProvider>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </ToastProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
