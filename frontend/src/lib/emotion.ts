import createCache, { EmotionCache, Options } from '@emotion/cache';

/*
 * https://github.com/mui/material-ui/blob/master/examples/material-next-ts/src/createEmotionCache.ts
 */

const isBrowser = typeof document !== 'undefined';

export const createEmotionCache = (): EmotionCache => {
  const options: Options = { key: 'mui-style' };
  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    options.insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache(options);
};
