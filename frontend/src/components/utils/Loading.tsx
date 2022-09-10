import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

export type LoadingProps = {
  text?: string;
};

const Loading: React.FC<LoadingProps> = React.forwardRef((props, ref) => {
  const { text } = props;

  return (
    <Box
      ref={ref}
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: 1,
      }}
    >
      <CircularProgress sx={{ mb: 1 }} />
      {text && (
        <Typography
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
});

Loading.displayName = 'Loading';

export default Loading;
