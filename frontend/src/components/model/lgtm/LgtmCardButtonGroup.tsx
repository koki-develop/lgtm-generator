import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { orange, pink } from '@mui/material/colors';
import copy from 'copy-to-clipboard';
import React, { useCallback, useMemo, useState } from 'react';
import urlJoin from 'url-join';
import { useToast } from '@/components/providers/ToastProvider';
import ReportForm from '@/components/model/report/ReportForm';
import {
  useAddFavoriteId,
  useFavoriteIds,
  useRemoveFavoriteId,
} from '@/hooks/lgtmHooks';
import { useTranslate } from '@/hooks/translateHooks';

type LgtmCardButtonGroupProps = {
  id: string;
};

const LgtmCardButtonGroup: React.FC<LgtmCardButtonGroupProps> = React.memo(
  props => {
    const { id } = props;

    const { enqueueSuccess } = useToast();
    const { addFavoriteId } = useAddFavoriteId();
    const { removeFavoriteId } = useRemoveFavoriteId();
    const { t } = useTranslate();

    const favoriteIds = useFavoriteIds();
    const [openReportForm, setOpenReportForm] = useState<boolean>(false);

    const favorited = useMemo(() => {
      return favoriteIds.includes(id);
    }, [favoriteIds, id]);

    const handleClickFavoriteButton = useCallback(() => {
      addFavoriteId(id);
    }, [addFavoriteId, id]);

    const handleClickUnfavoriteButton = useCallback(() => {
      removeFavoriteId(id);
    }, [id, removeFavoriteId]);

    const handleClickCopyButton = useCallback(() => {
      const text = `![LGTM](${urlJoin(
        process.env.NEXT_PUBLIC_LGTMS_ORIGIN,
        id,
      )})`;
      copy(text);
      enqueueSuccess(t.COPIED_TO_CLIPBOARD);
    }, [enqueueSuccess, id, t.COPIED_TO_CLIPBOARD]);

    const handleClickReportButton = useCallback(() => {
      setOpenReportForm(true);
    }, []);

    const handleCloseReportForm = useCallback(() => {
      setOpenReportForm(false);
    }, []);

    return (
      <>
        <ReportForm
          lgtmId={id}
          imgSrc={urlJoin(process.env.NEXT_PUBLIC_LGTMS_ORIGIN, id)}
          open={openReportForm}
          onClose={handleCloseReportForm}
        />
        <ButtonGroup color='primary' sx={{ maxWidth: '100%' }}>
          {/* コピー */}
          <Button
            data-testid='lgtm-card-copy-button'
            onClick={handleClickCopyButton}
          >
            <FileCopyOutlinedIcon fontSize='small' />
          </Button>

          {/* お気に入り */}
          {favorited ? (
            <Button
              data-testid='lgtm-card-unfavorite-button'
              onClick={handleClickUnfavoriteButton}
              sx={{
                backgroundColor: pink['100'],
                color: pink['700'],
                '&:hover': {
                  backgroundColor: pink['200'],
                },
              }}
            >
              <FavoriteIcon fontSize='small' />
            </Button>
          ) : (
            <Button
              data-testid='lgtm-card-favorite-button'
              onClick={handleClickFavoriteButton}
              sx={{
                backgroundColor: '#fff',
                color: pink['700'],
                '&:hover': {
                  backgroundColor: pink['50'],
                },
              }}
            >
              <FavoriteBorderIcon fontSize='small' />
            </Button>
          )}

          {/* 通報 */}
          <Button
            data-testid='lgtm-card-report-button'
            onClick={handleClickReportButton}
            sx={{
              backgroundColor: orange['500'],
              color: '#ffffff',
              '&:hover': {
                backgroundColor: orange['700'],
              },
            }}
          >
            <FlagOutlinedIcon fontSize='small' />
          </Button>
        </ButtonGroup>
      </>
    );
  },
);

LgtmCardButtonGroup.displayName = 'LgtmCardButtonGroup';

export default LgtmCardButtonGroup;
