import React, { useEffect, useState } from 'react';
import { Lgtm } from '~/types/lgtm';
import { ApiClient } from '~/lib/apiClient';
import { ImageFileReader } from '~/lib/imageFileReader';
import { DataUrl } from '~/lib/dataUrl';
import { useToast } from '~/contexts/toastProvider';
import {
  Box,
  Button,
  Grid,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import UploadButton from './uploadButton';
import LgtmCard from './lgtmCard';
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

const perPage = 2;

const LgtmsPanel: React.VFC = React.memo(() => {
  const classes = useStyles();

  const [lgtms, setLgtms] = useState<Lgtm[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [openConfirmForm, setOpenConfirmForm] = useState<boolean>(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>();
  const [previewContentType, setPreviewContentType] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const { enqueueSuccess } = useToast();

  const handleCloseConfirmForm = () => {
    setOpenConfirmForm(false);
  };

  const handleChangeFile = (file: File) => {
    setLoadingImage(true);
    ImageFileReader.readAsDataUrl(file).then(dataUrl => {
      setLoadingImage(false);
      setPreviewDataUrl(dataUrl);
      setPreviewContentType(file.type);
      setOpenConfirmForm(true);
    });
  };

  const handleConfirm = () => {
    setUploading(true);
    ApiClient.createLgtm(new DataUrl(previewDataUrl).toBase64(), previewContentType).then(lgtm => {
      setUploading(false);
      setOpenConfirmForm(false);
      setLgtms(prev => [lgtm, ...prev]);
      enqueueSuccess('LGTM 画像を生成しました');
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
    <Box>
      <Modal open={loadingImage}>
        <Loading text='読込中' />
      </Modal>
      <UploadButton onChange={handleChangeFile} />
      <ConfirmForm
        loading={uploading}
        previewDataUrl={previewDataUrl}
        open={openConfirmForm}
        onClose={handleCloseConfirmForm}
        onConfirm={handleConfirm}
      />

      <Grid
        container
        spacing={2}
      >
        {lgtms.map(lgtm => (
          <Grid
            key={lgtm.id}
            item
            xs={3}
          >
            <LgtmCard
              lgtm={lgtm}
            />
          </Grid>
        ))}
      </Grid>

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
