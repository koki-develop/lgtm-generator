import React, { useState } from 'react';
import {
  Box,
  TextField,
} from '@material-ui/core';
import Field from '~/components/field';
import Form from '~/components/form';
import { ApiClient } from '~/lib/apiClient';

type SearchImagesPanelProps = {
  show: boolean;
};

const SearchImagesPanel: React.VFC<SearchImagesPanelProps> = React.memo((props: SearchImagesPanelProps) => {
  const [query, setQuery] = useState<string>('');

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = () => {
    ApiClient.searchImages(query).then(images => {
      console.log(images);
    });
  };

  return (
    <Box hidden={!props.show}>
      <Form onSubmit={handleSubmit}>
        <Field>
          <TextField
            fullWidth
            variant='outlined'
            type='search'
            value={query}
            onChange={handleChangeQuery}
          />
        </Field>
      </Form>
    </Box>
  );
});

SearchImagesPanel.displayName = 'SearchImagesPanel';

export default SearchImagesPanel;
