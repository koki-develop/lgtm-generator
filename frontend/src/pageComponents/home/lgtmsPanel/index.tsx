import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { lgtmsState } from '~/recoil/atoms';
import {
  ApiClient,
  UnsupportedImageFormatError,
} from '~/lib/apiClient';
import {
  FileTooLargeError,
  ImageFileReader,
} from '~/lib/imageFileReader';
import { DataUrl } from '~/lib/dataUrl';
import { useToast } from '~/contexts/toastProvider';
import {
  Box,
  Button,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import UploadButton from './uploadButton';
import LgtmCardList from '../lgtmCardList';
import ConfirmForm from '../confirmForm';
import Loading from '~/components/loading';
import Modal from '~/components/modal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingContainer: {
      marginTop: theme.spacing(2),
    },
    moreButtonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
    },
  }),
);

const perPage = 20;

type LgtmsPanelProps = {
  show: boolean;
};

const LgtmsPanel: React.VFC<LgtmsPanelProps> = React.memo((props: LgtmsPanelProps) => {
  const classes = useStyles();

  const [lgtms, setLgtms] = useRecoilState(lgtmsState);
  const [uploading, setUploading] = useState<boolean>(false);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [openConfirmForm, setOpenConfirmForm] = useState<boolean>(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>();
  const [previewContentType, setPreviewContentType] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const { enqueueSuccess, enqueueWarn, enqueueError } = useToast();

  const handleCloseConfirmForm = () => {
    setOpenConfirmForm(false);
  };

  const handleChangeFile = (file: File) => {
    setLoadingImage(true);
    ImageFileReader.readAsDataUrl(file).then(dataUrl => {
      setPreviewDataUrl(dataUrl);
      setPreviewContentType(file.type);
      setOpenConfirmForm(true);
    }).catch(error => {
      switch (error.constructor) {
        case FileTooLargeError:
          enqueueWarn(`ファイルサイズが上限を超えています: ${file.name}`);
          break;
        default:
          enqueueError(画像の読み込みに失敗しました);
          throw error;
      }
    }).finally(() => {
      setLoadingImage(false);
    });
  };

  const handleConfirm = () => {
    setUploading(true);
    ApiClient.createLgtmFromBase64(new DataUrl(previewDataUrl).toBase64(), previewContentType).then(lgtm => {
      setOpenConfirmForm(false);
      setLgtms(prev => [lgtm, ...prev]);
      enqueueSuccess('LGTM 画像を生成しました');
    }).catch(error => {
      switch (error.constructor) {
        case UnsupportedImageFormatError:
          enqueueError('サポートしていない画像形式です');
          break;
        default:
          enqueueError('LGTM 画像の生成に失敗しました');
          console.error(error);
          break;
      }
    }).finally(() => {
      setUploading(false);
    });
  };

  const handleClickMore = () => {
    loadLgtms();
  };

  const loadLgtms = () => {
    setLoading(true);
    ApiClient.getLgtms(perPage, lgtms.slice(-1)[0]?.id).then(lgtms => {
      setLgtms(prev => [...prev, ...lgtms]);
      setShowMore(lgtms.length === perPage);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadLgtms();
  }, []);

  return (
    <Box hidden={!props.show}>
      <Modal open={loadingImage}>
        <Loading text='読込中' />
      </Modal>
      <UploadButton onChange={handleChangeFile} />
      <ConfirmForm
        loading={uploading}
        previewSrc={previewDataUrl}
        open={openConfirmForm}
        onClose={handleCloseConfirmForm}
        onConfirm={handleConfirm}
      />

      <LgtmCardList ids={lgtms.map(lgtm => lgtm.id)} />

      <Box className={classes.moreButtonContainer}>
        {loading && <Loading />}
        {!loading && showMore && (
            <Button
              color='primary'
              variant='contained'
              onClick={handleClickMore}
            >
              もっと見る
            </Button>
        )}
      </Box>
    </Box>
  );
});

LgtmsPanel.displayName = 'LgtmsPanel';

export default LgtmsPanel;
