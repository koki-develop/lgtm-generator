import React, { useCallback, useState, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { lgtmsState } from '~/recoil/atoms';
import { useToast } from '~/components/providers/ToastProvider';
import { Box, InputAdornment, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import Field from '~/components/utils/Field';
import Form from '~/components/utils/Form';
import Loading from '~/components/utils/Loading';
import { ApiClient } from '~/lib/apiClient';
import { UnsupportedImageFormatError } from '~/lib/errors';
import { Image } from '~/types/image';
import ImageCardList from '../../model/image/ImageCardList';
import ConfirmForm from '../../model/lgtm/LgtmForm';

type SearchImagesPanelProps = {
  show: boolean;
};

const SearchImagesPanel: React.VFC<SearchImagesPanelProps> = React.memo(
  props => {
    const { show } = props;

    const { enqueueSuccess, enqueueError } = useToast();
    const queryInputRef = useRef<HTMLInputElement>();
    const setLgtms = useSetRecoilState(lgtmsState);
    const [query, setQuery] = useState<string>('');
    const [searching, setSearching] = useState<boolean>(false);
    const [images, setImages] = useState<Image[]>([]);
    const [generating, setGenerating] = useState<boolean>(false);
    const [openConfirmForm, setOpenConfirmForm] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    const handleChangeQuery = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value);
      },
      [],
    );

    const handleSearch = useCallback(() => {
      queryInputRef.current?.blur();
      setSearching(true);
      ApiClient.searchImages(query).then(images => {
        setImages(images);
        setSearching(false);
      });
    }, [query]);

    const handleClickImage = useCallback((image: Image) => {
      setPreviewUrl(image.url);
      setOpenConfirmForm(true);
    }, []);

    const handleCloseConfirmForm = useCallback(() => {
      setOpenConfirmForm(false);
    }, []);

    const handleConfirm = useCallback(() => {
      setGenerating(true);
      ApiClient.createLgtmFromUrl(previewUrl)
        .then(lgtm => {
          setOpenConfirmForm(false);
          setLgtms(prev => [lgtm, ...prev]);
          enqueueSuccess('LGTM 画像を生成しました');
        })
        .catch(error => {
          switch (error.constructor) {
            case UnsupportedImageFormatError:
              enqueueError('サポートしていない画像形式です');
              break;
            default:
              enqueueError('LGTM 画像の生成に失敗しました');
              throw error;
          }
        })
        .finally(() => {
          setGenerating(false);
        });
    }, [enqueueError, enqueueSuccess, previewUrl, setLgtms]);

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
