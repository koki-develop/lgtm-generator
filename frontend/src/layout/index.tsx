import React from 'react';
import {
  Box,
} from '@material-ui/core';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.VFC<LayoutProps> = (props: LayoutProps) => {
  return (
    <Box>
      {props.children}
    </Box>
  );
};

export default Layout;
