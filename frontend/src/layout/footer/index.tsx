import React from 'react';
import Link from 'next/link';
import { Routes } from '~/routes';
import ExternalLink from '~/components/externalLink';
import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
    },
    list: {
      listStyleType: 'none',
      paddingLeft: 0,
    },
    listItem: {
      marginBottom: theme.spacing(1),
      textAlign: 'center',
    },
  }),
);

const Footer: React.VFC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} component='footer'>
      <ExternalLink href='https://koki.me'>
        <Typography component='small'>&copy;2021 koki sato</Typography>
      </ExternalLink>

      <ul className={classes.list}>
        <li className={classes.listItem}>
          <ExternalLink href='https://github.com/koki-develop/lgtm-generator'>
            View on GitHub
          </ExternalLink>
        </li>
        <li className={classes.listItem}>
          <Link href={Routes.precaution}>
            <a>ご利用上の注意</a>
          </Link>
        </li>
        <li className={classes.listItem}>
          <Link href={Routes.privacyPolicy}>
            <a>プライバシーポリシー</a>
          </Link>
        </li>
      </ul>
    </Box>
  );
};

export default Footer;
