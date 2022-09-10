import { Box, BoxProps } from '@mui/material';
import React from 'react';

export type FieldProps = BoxProps;

const Field: React.FC<FieldProps> = React.memo(props => {
  return <Box {...props} sx={{ mb: 2, ...props.sx }} />;
});

Field.displayName = 'Field';

export default Field;
