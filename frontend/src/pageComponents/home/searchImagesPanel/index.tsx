import React from 'react';
import { Box } from '@material-ui/core';

type SearchImagesPanelProps = {
  show: boolean;
};

const SearchImagesPanel: React.VFC<SearchImagesPanelProps> = React.memo((props: SearchImagesPanelProps) => {
  return (
    <Box hidden={!props.show}>
      search images
    </Box>
  );
});

SearchImagesPanel.displayName = 'SearchImagesPanel';

export default SearchImagesPanel;
