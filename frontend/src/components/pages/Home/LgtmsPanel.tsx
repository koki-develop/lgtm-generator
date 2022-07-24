import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useCallback, useEffect, useState } from 'react';
import LgtmCardList from '~/components/model/lgtm/LgtmCardList';
import LgtmForm from '~/components/model/lgtm/LgtmForm';
import Field from '~/components/utils/Field';
import Loading from '~/components/utils/Loading';
import Modal from '~/components/utils/Modal';
import {
  useCreateLgtmFromBase64,
  useFetchLgtms,
  useLgtms,
} from '~/hooks/lgtmHooks';
import { useTranslate } from '~/hooks/translateHooks';
import { DataStorage } from '~/lib/dataStorage';
import { DataUrl } from '~/lib/dataUrl';
import { ImageFile, useLoadImage } from '~/lib/imageFileReader';
import UploadButton from './UploadButton';

type LgtmsPanelProps = {
  show: boolean;
};

const LgtmsPanel: React.VFC<LgtmsPanelProps> = React.memo(props => {
  const { show } = props;

  const lgtms = useLgtms();
  const [openConfirmForm, setOpenConfirmForm] = useState<boolean>(false);
  const [previewImageFile, setPreviewImageFile] = useState<ImageFile | null>(
    null,
  );
  const [randomly, setRandomly] = useState<boolean>(false);

  const { t } = useTranslate();
  const { fetchLgtms, loading, isTruncated } = useFetchLgtms();
  const { createLgtmFromBase64, loading: uploading } =
    useCreateLgtmFromBase64();
  const { loadImage, loading: loadingImage } = useLoadImage();

  const handleCloseConfirmForm = useCallback(() => {
    setOpenConfirmForm(false);
  }, []);

  const handleChangeRandomly = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.currentTarget.checked;
      setRandomly(checked);
      DataStorage.setRandomly(checked);

      if (checked) {
        fetchLgtms({ reset: true, random: true });
      } else {
        fetchLgtms({ reset: true, random: false });
      }
    },
    [fetchLgtms],
  );

  const handleClickReload = useCallback(() => {
    window.scrollTo(0, 0);
    fetchLgtms({ reset: true, random: true });
  }, [fetchLgtms]);

  const handleChangeFile = useCallback(
    (file: File) => {
      loadImage(file).then(imageFile => {
        if (!imageFile) return;
        setPreviewImageFile(imageFile);
        setOpenConfirmForm(true);
      });
    },
    [loadImage],
  );

  const handleConfirm = useCallback(() => {
    createLgtmFromBase64(
      new DataUrl(previewImageFile.dataUrl).toBase64(),
      previewImageFile.type,
    ).then(() => {
      setOpenConfirmForm(false);
    });
  }, [createLgtmFromBase64, previewImageFile?.dataUrl, previewImageFile?.type]);

  const handleClickMore = useCallback(() => {
    fetchLgtms({ after: lgtms.slice(-1)[0]?.id, random: false });
  }, [fetchLgtms, lgtms]);

  useEffect(() => {
    setRandomly(DataStorage.getRandomly());
    fetchLgtms({ random: DataStorage.getRandomly() });
  }, [fetchLgtms]);

  return (
    <Box data-testid='lgtms-panel' hidden={!show}>
      <Modal open={loadingImage}>
        <Loading text={t.LOADING} />
      </Modal>
      <UploadButton onChange={handleChangeFile} />

      <LgtmForm
        loading={uploading}
        previewSrc={previewImageFile?.dataUrl}
        open={openConfirmForm}
        onClose={handleCloseConfirmForm}
        onConfirm={handleConfirm}
      />

      <Field>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormGroup>
            <FormControlLabel
              label={t.RANDOM}
              control={
                <Checkbox checked={randomly} onChange={handleChangeRandomly} />
              }
            />
          </FormGroup>
        </Box>

        <LgtmCardList ids={lgtms.map(lgtm => lgtm.id)} />
      </Field>

      <Field sx={{ display: 'flex', justifyContent: 'center' }}>
        {loading && <Loading />}
        {!randomly && !loading && isTruncated && (
          <Button color='primary' onClick={handleClickMore}>
            {t.SEE_MORE}
          </Button>
        )}
        {randomly && !loading && isTruncated && (
          <Button color='primary' onClick={handleClickReload}>
            {t.RELOAD}
          </Button>
        )}
      </Field>
    </Box>
  );
});

LgtmsPanel.displayName = 'LgtmsPanel';

export default LgtmsPanel;
