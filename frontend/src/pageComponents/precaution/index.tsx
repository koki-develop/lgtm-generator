import React from 'react';
import Layout from '~/layout';
import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: theme.typography.h4.fontSize,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    listItem: {
      marginBottom: theme.spacing(1),
    },
  }),
);

const Precaution: React.VFC = () => {
  const classes = useStyles();

  const items: string[] = [
    '本サービスを利用して生成された画像に関する一切の責任はご利用者様にご負担いただきます。ご利用者様が生成した画像に関し、第三者が損害を被った場合、運営者はご利用者様に代わっての責任は一切負いません。',
    '本サービスを利用して生成された画像はインターネット上に公開されます。',
    '元画像の著作権などに注意してください。公序良俗に反する画像や違法な画像を作成しないでください。これらの画像、その他運営者が不適切と判断した画像は予告無しに削除することがあります。',
    '過剰な数のリクエストを送信してサービスに負荷をかける行為はおやめください。',
    'その他、悪質な利用方法が確認された場合、特定のご利用者様を予告無しにアクセス禁止にすることがあります。',
  ];

  return (
    <Layout title='ご利用上の注意'>
      <Typography className={classes.title}>ご利用上の注意</Typography>
      <Box>
        <ul>
          {items.map((item, i) => (
            <li key={i} className={classes.listItem}>
              {item}
            </li>
          ))}
        </ul>
      </Box>
    </Layout>
  );
};

export default Precaution;
