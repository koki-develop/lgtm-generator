import React from 'react';
import { Box, BoxProps } from '@mui/material';

export type FieldProps = BoxProps;

const Field: React.VFC<FieldProps> = React.memo(props => {
  return <Box {...props} sx={{ mb: 2, ...props.sx }} />;
});

Field.displayName = 'Field';

export default Field;
