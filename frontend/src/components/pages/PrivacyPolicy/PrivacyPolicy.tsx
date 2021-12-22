import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '~/components/Layout';
import ExternalLink from '~/components/utils/ExternalLink';

const PrivacyPolicy: React.VFC = React.memo(() => {
  const items: { name: string; content: React.ReactNode }[] = [
    {
      name: 'アクセス解析ツールについて',
      content: (
        <>
          当サイトでは、 Google によるアクセス解析ツール「 Google
          アナリティクス」を利用しています。この Google
          アナリティクスはトラフィックデータの収集のために Cookie
          を使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能は
          Cookie
          を無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは{' '}
          <ExternalLink
            href='https://marketingplatform.google.com/about/analytics/terms/jp/'
            sx={{
              color: theme => theme.palette.primary.main,
              textDecoration: 'underline',
            }}
          >
            Google アナリティクス利用規約
          </ExternalLink>{' '}
          を参照してください。
        </>
      ),
    },
    {
      name: 'プライバシーポリシーの変更について',
      content:
        '当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。',
    },
  ];

  return (
    <Layout title='プライバシーポリシー'>
      <Typography
        sx={{
          fontSize: theme => theme.typography.h4.fontSize,
          fontWeight: 'bold',
          mb: 2,
          textAlign: 'center',
        }}
      >
        プライバシーポリシー
      </Typography>
      <Box>
        {items.map(item => (
          <Box
            key={item.name}
            sx={{
              mb: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: theme => theme.typography.h5.fontSize,
                textAlign: 'center',
              }}
            >
              {item.name}
            </Typography>
            <Typography>{item.content}</Typography>
          </Box>
        ))}
      </Box>
    </Layout>
  );
});

PrivacyPolicy.displayName = 'PrivacyPolicy';

export default PrivacyPolicy;
