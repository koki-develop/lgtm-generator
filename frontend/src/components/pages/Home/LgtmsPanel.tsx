import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ImageFile, ImageFileReader } from '~/lib/imageFileReader';
import { FileTooLargeError, UnsupportedImageFormatError } from '~/lib/errors';
import { DataUrl } from '~/lib/dataUrl';
import { useToast } from '~/components/providers/ToastProvider';
import UploadButton from './UploadButton';
import LgtmCardList from '~/components/model/lgtm/LgtmCardList';
import LgtmForm from '~/components/model/lgtm/LgtmForm';
import {
  useCreateLgtmFromBase64,
  useFetchLgtms,
  useLgtms,
} from '~/components/model/lgtm/hooks';
import Loading from '~/components/utils/Loading';
import Modal from '~/components/utils/Modal';

type LgtmsPanelProps = {
  show: boolean;
};

const LgtmsPanel: React.VFC<LgtmsPanelProps> = React.memo(props => {
  const { show } = props;

  const lgtms = useLgtms();
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [openConfirmForm, setOpenConfirmForm] = useState<boolean>(false);
  const [previewImageFile, setPreviewImageFile] = useState<ImageFile>();

  const { enqueueSuccess, enqueueWarn, enqueueError } = useToast();
  const { fetchLgtms, loading, isTruncated } = useFetchLgtms();
  const { createLgtmFromBase64, loading: uploading } =
    useCreateLgtmFromBase64();

  const handleCloseConfirmForm = useCallback(() => {
    setOpenConfirmForm(false);
  }, []);

  const handleChangeFile = useCallback(
    (file: File) => {
      setLoadingImage(true);
      ImageFileReader.read(file)
        .then(imageFile => {
          setPreviewImageFile(imageFile);
          setOpenConfirmForm(true);
        })
        .catch(error => {
          switch (error.constructor) {
            case FileTooLargeError:
              enqueueWarn(`ファイルサイズが大きすぎます: ${file.name}`);
              break;
            case UnsupportedImageFormatError:
              enqueueError('サポートしていない画像形式です');
              break;
            default:
              enqueueError('画像の読み込みに失敗しました');
              throw error;
          }
        })
        .finally(() => {
          setLoadingImage(false);
        });
    },
    [enqueueError, enqueueWarn],
  );

  const handleConfirm = useCallback(() => {
    createLgtmFromBase64(
      new DataUrl(previewImageFile.dataUrl).toBase64(),
      previewImageFile.type,
    )
      .then(() => {
        setOpenConfirmForm(false);
        enqueueSuccess('LGTM 画像を生成しました');
      })
      .catch(err => {
        switch (err.constructor) {
          case UnsupportedImageFormatError:
            enqueueError('サポートしていない画像形式です');
            break;
          default:
            enqueueError('LGTM 画像の生成に失敗しました');
            console.error(err);
            break;
        }
      });
  }, [
    createLgtmFromBase64,
    enqueueError,
    enqueueSuccess,
    previewImageFile?.dataUrl,
    previewImageFile?.type,
  ]);

  const handleClickMore = useCallback(() => {
    fetchLgtms(lgtms.slice(-1)[0]?.id);
  }, [fetchLgtms, lgtms]);

  useEffect(() => {
    fetchLgtms();
  }, [fetchLgtms]);

  return (
    <Box hidden={!show}>
      <Modal open={loadingImage}>
        <Loading text='読込中' />
      </Modal>
      <UploadButton onChange={handleChangeFile} />

      <LgtmForm
        loading={uploading}
        previewSrc={previewImageFile?.dataUrl}
        open={openConfirmForm}
        onClose={handleCloseConfirmForm}
        onConfirm={handleConfirm}
      />

      <LgtmCardList ids={lgtms.map(lgtm => lgtm.id)} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        {loading && <Loading />}
        {!loading && isTruncated && (
          <Button color='primary' variant='contained' onClick={handleClickMore}>
            もっと見る
          </Button>
        )}
      </Box>
    </Box>
  );
});

LgtmsPanel.displayName = 'LgtmsPanel';

export default LgtmsPanel;
