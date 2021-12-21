import React from 'react';
import { Box, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Layout from '~/components/Layout';
import ExternalLink from '~/components/utils/ExternalLink';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: theme.typography.h4.fontSize,
      fontWeight: 'bold',
      marginBottom: theme.spacing(2),
      textAlign: 'center',
    },
    listItem: {
      marginBottom: theme.spacing(4),
    },
    name: {
      fontSize: theme.typography.h5.fontSize,
      textAlign: 'center',
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
  }),
);

const PrivacyPolicy: React.VFC = () => {
  const classes = useStyles();

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
            className={classes.link}
            href='https://marketingplatform.google.com/about/analytics/terms/jp/'
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
      <Typography className={classes.title}>プライバシーポリシー</Typography>
      <Box>
        {items.map(item => (
          <Box key={item.name} className={classes.listItem}>
            <Typography className={classes.name}>{item.name}</Typography>
            <Typography>{item.content}</Typography>
          </Box>
        ))}
      </Box>
    </Layout>
  );
};

export default PrivacyPolicy;
