import React, { useState } from 'react';
import { useToast } from '~/contexts/toastProvider';
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
import ConfirmForm from '../confirmForm';

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

  const { enqueueSuccess } = useToast();
  const [query, setQuery] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const [images, setImages] = useState<Image[]>([]);
  const [generating, setGenerating] = useState<boolean>(false);
  const [openConfirmForm, setOpenConfirmForm] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleSearch = () => {
    setSearching(true);
    ApiClient.searchImages(query).then(images => {
      setImages(images);
      setSearching(false);
    });
  };

  const handleClickImage = (image: Image) => {
    setPreviewUrl(image.url);
    setOpenConfirmForm(true);
  };

  const handleCloseConfirmForm = () => {
    setOpenConfirmForm(false);
  };

  const handleConfirm = () => {
    setGenerating(true);
    ApiClient.createLgtmFromUrl(previewUrl).then(lgtm => {
      setGenerating(false);
      setOpenConfirmForm(false);
      enqueueSuccess('LGTM 画像を生成しました');
    });
  };

  return (
    <Box hidden={!props.show}>
      <Form onSubmit={handleSearch}>
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
        <ConfirmForm
          loading={generating}
          previewSrc={previewUrl}
          open={openConfirmForm}
          onClose={handleCloseConfirmForm}
          onConfirm={handleConfirm}
        />
        {searching ? (
          <Loading />
        ) : (
          <ImageCardList
            images={images}
            onClickImage={handleClickImage}
          />
        )}
      </Field>
    </Box>
  );
});

SearchImagesPanel.displayName = 'SearchImagesPanel';

export default SearchImagesPanel;
