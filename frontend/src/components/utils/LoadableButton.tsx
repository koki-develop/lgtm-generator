import { Button, ButtonProps, CircularProgress } from '@mui/material';
import React from 'react';

export type LoadableButtonProps = ButtonProps & {
  loading: boolean;
};

const LoadableButton: React.FC<LoadableButtonProps> = React.memo(props => {
  const { loading, children, ...buttonProps } = props;

  return (
    <Button {...buttonProps} disabled={props.disabled || loading}>
      {children}
      {loading && <CircularProgress size={24} sx={{ position: 'absolute' }} />}
    </Button>
  );
});

LoadableButton.displayName = 'LoadableButton';

export default LoadableButton;
