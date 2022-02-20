import { useTheme } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import urlJoin from 'url-join';
import { useTranslate } from '~/hooks/translateHooks';

export type MetaProps = {
  title?: string;
};

const Meta: React.VFC<MetaProps> = React.memo(props => {
  const { title } = props;

  const router = useRouter();

  const { t } = useTranslate();

  const theme = useTheme();

  const titleText = useMemo(() => {
    if (!title) {
      return t.APP_NAME;
    }
    return `${title} | ${t.APP_NAME}`;
  }, [t.APP_NAME, title]);

  return (
    <Head>
      {/* basic */}
      <meta name='theme-color' content={theme.palette.primary.main} />
      <link rel='icon' href='https://lgtmgen.org/favicon.ico' />
      <link rel='apple-touch-icon' href='https://lgtmgen.org/logo192.png' />
      <link rel='manifest' href='https://lgtmgen.org/manifest.json' />

      {/* title */}
      <meta property='og:site_name' content={t.APP_NAME} />
      <title>{titleText}</title>
      <meta property='og:title' content={titleText} />

      {/* description */}
      <meta name='description' content={t.APP_DESCRIPTION} />
      <meta property='og:description' content={t.APP_DESCRIPTION} />

      {/* image */}
      <meta property='og:image:width' content='600' />
      <meta property='og:image:height' content='314' />
      <meta property='og:image' content='https://lgtmgen.org/card.png' />
      <meta
        property='og:image:secure_url'
        content='https://lgtmgen.org/card.png'
      />
      {/* TODO: locale によって切り替える */}
      <meta property='og:locale' content='ja_JP' />

      {/* ogp */}
      <meta property='og:type' content='website' />
      <meta
        property='og:url'
        content={urlJoin('https://lgtmgen.org', router.asPath)}
      />

      {/* twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@koki_develop' />
    </Head>
  );
});

Meta.displayName = 'Meta';

export default Meta;
