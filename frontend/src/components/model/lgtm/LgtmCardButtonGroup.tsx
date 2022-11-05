import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { orange, pink } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
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
    const [copyButtonEl, setCopyButtonEl] = useState<HTMLButtonElement | null>(
      null,
    );
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

    const handleClickCopyButton = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setCopyButtonEl(e.currentTarget);
      },
      [],
    );

    const handleClickOutsideCopyList = useCallback(() => {
      setCopyButtonEl(null);
    }, []);

    const handleClickCopyMarkdownLink = useCallback(() => {
      const text = `![LGTM](${urlJoin(
        process.env.NEXT_PUBLIC_LGTMS_ORIGIN,
        id,
      )})`;
      copy(text);
      enqueueSuccess(t.COPIED_TO_CLIPBOARD);
      setCopyButtonEl(null);
    }, [enqueueSuccess, id, t.COPIED_TO_CLIPBOARD]);

    const handleClickCopyHtmlLink = useCallback(() => {
      const text = `<img src="${urlJoin(
        process.env.NEXT_PUBLIC_LGTMS_ORIGIN,
        id,
      )}" alt="LGTM" />`;
      copy(text);
      enqueueSuccess(t.COPIED_TO_CLIPBOARD);
      setCopyButtonEl(null);
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
          <Popper
            open={Boolean(copyButtonEl)}
            anchorEl={copyButtonEl}
            placement='top'
          >
            <ClickAwayListener onClickAway={handleClickOutsideCopyList}>
              <Paper>
                <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton
                      data-testid='lgtm-card-copy-markdown-button'
                      onClick={handleClickCopyMarkdownLink}
                    >
                      <ListItemText
                        secondary='Markdown'
                        secondaryTypographyProps={{
                          sx: { textAlign: 'center' },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton
                      data-testid='lgtm-card-copy-html-button'
                      onClick={handleClickCopyHtmlLink}
                    >
                      <ListItemText
                        secondary='HTML'
                        secondaryTypographyProps={{
                          sx: { textAlign: 'center' },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Paper>
            </ClickAwayListener>
          </Popper>

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
