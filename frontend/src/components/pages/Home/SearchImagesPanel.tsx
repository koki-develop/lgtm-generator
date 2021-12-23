import React, { useCallback, useState, useRef } from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import Field from '~/components/utils/Field';
import Form from '~/components/utils/Form';
import Loading from '~/components/utils/Loading';
import { Image } from '~/types/image';
import ImageCardList from '../../model/image/ImageCardList';
import ConfirmForm from '../../model/lgtm/LgtmForm';
import { useCreateLgtmFromUrl } from '~/components/model/lgtm/LgtmHooks';
import {
  useImages,
  useSearchImages,
} from '~/components/model/image/ImageHooks';

type SearchImagesPanelProps = {
  show: boolean;
};

const SearchImagesPanel: React.VFC<SearchImagesPanelProps> = React.memo(
  props => {
    const { show } = props;

    const queryInputRef = useRef<HTMLInputElement>();

    const images = useImages();
    const [query, setQuery] = useState<string>('');
    const [openConfirmForm, setOpenConfirmForm] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    const { searchImages, loading: searching } = useSearchImages();
    const { createLgtmFromUrl, loading: generating } = useCreateLgtmFromUrl();

    const handleChangeQuery = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value);
      },
      [],
    );

    const handleSearch = useCallback(() => {
      queryInputRef.current?.blur();
      searchImages(query);
    }, [query, searchImages]);

    const handleClickImage = useCallback((image: Image) => {
      setPreviewUrl(image.url);
      setOpenConfirmForm(true);
    }, []);

    const handleCloseConfirmForm = useCallback(() => {
      setOpenConfirmForm(false);
    }, []);

    const handleConfirm = useCallback(() => {
      createLgtmFromUrl(previewUrl).then(() => {
        setOpenConfirmForm(false);
      });
    }, [createLgtmFromUrl, previewUrl]);

    return (
      <Box hidden={!show}>
        <Form onSubmit={handleSearch}>
          <Field>
            <TextField
              sx={{
                backgroundColor: theme => theme.palette.common.white,
              }}
              fullWidth
              disabled={searching}
              variant='outlined'
              type='search'
              value={query}
              onChange={handleChangeQuery}
              placeholder='キーワード'
              inputProps={{
                ref: queryInputRef,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
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
            <ImageCardList images={images} onClickImage={handleClickImage} />
          )}
        </Field>
      </Box>
    );
  },
);

SearchImagesPanel.displayName = 'SearchImagesPanel';

export default SearchImagesPanel;
