import React, { useState } from 'react';
import {
  Box,
  TextField,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Field from '~/components/field';
import Form from '~/components/form';
import Loading from '~/components/loading';
import { ApiClient } from '~/lib/apiClient';
import { Image } from '~/types/image';
import ImageCardList from './imageCardList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    queryInput: {
      backgroundColor: theme.palette.common.white,
    },
  }),
);

type SearchImagesPanelProps = {
  show: boolean;
};

const SearchImagesPanel: React.VFC<SearchImagesPanelProps> = React.memo((props: SearchImagesPanelProps) => {
  const classes = useStyles();

  const [query, setQuery] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const [images, setImages] = useState<Image[]>([]);

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = () => {
    setSearching(true);
    ApiClient.searchImages(query).then(images => {
      setImages(images);
      setSearching(false);
    });
  };

  return (
    <Box hidden={!props.show}>
      <Form onSubmit={handleSubmit}>
        <Field>
          <TextField
            className={classes.queryInput}
            fullWidth
            disabled={searching}
            variant='outlined'
            type='search'
            value={query}
            onChange={handleChangeQuery}
          />
        </Field>
      </Form>

      <Field>
        {searching ? (
          <Loading />
        ) : (
          <ImageCardList
            images={images}
          />
        )}
      </Field>
    </Box>
  );
});

SearchImagesPanel.displayName = 'SearchImagesPanel';

export default SearchImagesPanel;
