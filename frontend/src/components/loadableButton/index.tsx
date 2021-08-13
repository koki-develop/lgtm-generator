import React from 'react';
import {
  Button,
  ButtonProps,
  CircularProgress,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

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

const LoadableButton: React.VFC<LoadableButtonProps> = (props: LoadableButtonProps) => {
  const classes = useStyles();
  const { loading, children, ...buttonProps } = props;

  return (
    <Button
      {...buttonProps}
      disabled={props.disabled || loading}
    >
      {children}
      {loading && (
        <CircularProgress
          className={classes.circularProgress}
          size={24}
        />
      )}
    </Button>
  );
};

export default LoadableButton;
