import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/global.scss';

const App: React.VFC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles) jssStyles.remove();
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STAGE === 'prod') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, { page_path: router.pathname });
    }
  }, [router.pathname]);

  return (
    <Component {...pageProps} />
  );
};

export default App;
