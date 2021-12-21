import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export type LoadableButtonProps = ButtonProps & {
  loading: boolean;
};

const useStyles = makeStyles(() =>
  createStyles({
    circularProgress: {
      position: 'absolute',
    },
  }),
);

const LoadableButton: React.VFC<LoadableButtonProps> = (
  props: LoadableButtonProps,
) => {
  const classes = useStyles();
  const { loading, children, ...buttonProps } = props;

  return (
    <Button {...buttonProps} disabled={props.disabled || loading}>
      {children}
      {loading && (
        <CircularProgress className={classes.circularProgress} size={24} />
      )}
    </Button>
  );
};

export default LoadableButton;
