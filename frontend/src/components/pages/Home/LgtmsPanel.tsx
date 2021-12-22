import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { lgtmsState } from '~/recoil/atoms';
import { ApiClient } from '~/lib/apiClient';
import { ImageFile, ImageFileReader } from '~/lib/imageFileReader';
import { FileTooLargeError, UnsupportedImageFormatError } from '~/lib/errors';
import { DataUrl } from '~/lib/dataUrl';
import { useToast } from '~/components/providers/ToastProvider';
import { Box, Button } from '@mui/material';
import UploadButton from './UploadButton';
import LgtmCardList from '../../model/lgtm/LgtmCardList';
import ConfirmForm from '../../model/lgtm/LgtmForm';
import Loading from '~/components/utils/Loading';
import Modal from '~/components/utils/Modal';

const perPage = 20;

type LgtmsPanelProps = {
  show: boolean;
};

const LgtmsPanel: React.VFC<LgtmsPanelProps> = React.memo(props => {
  const { show } = props;

  const [lgtms, setLgtms] = useRecoilState(lgtmsState);
  const [uploading, setUploading] = useState<boolean>(false);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [openConfirmForm, setOpenConfirmForm] = useState<boolean>(false);
  const [previewImageFile, setPreviewImageFile] = useState<ImageFile>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const { enqueueSuccess, enqueueWarn, enqueueError } = useToast();

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
    setUploading(true);
    ApiClient.createLgtmFromBase64(
      new DataUrl(previewImageFile.dataUrl).toBase64(),
      previewImageFile.type,
    )
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
            console.error(error);
            break;
        }
      })
      .finally(() => {
        setUploading(false);
      });
  }, [
    enqueueError,
    enqueueSuccess,
    previewImageFile?.dataUrl,
    previewImageFile?.type,
    setLgtms,
  ]);

  const loadLgtms = useCallback(() => {
    setLoading(true);
    ApiClient.getLgtms(perPage, lgtms.slice(-1)[0]?.id).then(lgtms => {
      setLgtms(prev => [...prev, ...lgtms]);
      setShowMore(lgtms.length === perPage);
      setLoading(false);
    });
  }, [lgtms, setLgtms]);

  const handleClickMore = useCallback(() => {
    loadLgtms();
  }, [loadLgtms]);

  useEffect(() => {
    loadLgtms();
  }, [loadLgtms]);

  return (
    <Box hidden={!show}>
      <Modal open={loadingImage}>
        <Loading text='読込中' />
      </Modal>
      <UploadButton onChange={handleChangeFile} />
      <ConfirmForm
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
        {!loading && showMore && (
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
