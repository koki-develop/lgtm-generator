import React, { useEffect } from 'react';
import { AppProps } from 'next/app';

const App: React.VFC<AppProps> = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles) jssStyles.remove();
  }, []);

  return (
    <Component {...pageProps}/>
  );
};

export default App;
