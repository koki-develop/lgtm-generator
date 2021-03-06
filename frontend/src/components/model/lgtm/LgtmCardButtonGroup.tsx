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
import React, { useCallback, useMemo, useState } from 'react';
import CopyToClipBoard from 'react-copy-to-clipboard';
import urlJoin from 'url-join';
import ReportForm from '~/components/model/report/ReportForm';
import { useToast } from '~/components/providers/ToastProvider';
import {
  useAddFavoriteId,
  useFavoriteIds,
  useRemoveFavoriteId,
} from '~/hooks/lgtmHooks';
import { useTranslate } from '~/hooks/translateHooks';

type LgtmCardButtonGroupProps = {
  id: string;
};

const LgtmCardButtonGroup: React.VFC<LgtmCardButtonGroupProps> = React.memo(
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

    const handleClickCopyLink = useCallback(() => {
      enqueueSuccess(t.COPIED_TO_CLIPBOARD);
      setCopyButtonEl(null);
    }, [enqueueSuccess, t.COPIED_TO_CLIPBOARD]);

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
          {/* ????????? */}
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
                      onClick={handleClickCopyLink}
                    >
                      <CopyToClipBoard
                        text={`![LGTM](${urlJoin(
                          process.env.NEXT_PUBLIC_LGTMS_ORIGIN,
                          id,
                        )})`}
                      >
                        <ListItemText
                          secondary='Markdown'
                          secondaryTypographyProps={{
                            sx: { textAlign: 'center' },
                          }}
                        />
                      </CopyToClipBoard>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton
                      data-testid='lgtm-card-copy-html-button'
                      onClick={handleClickCopyLink}
                    >
                      <CopyToClipBoard
                        text={`<img src="${urlJoin(
                          process.env.NEXT_PUBLIC_LGTMS_ORIGIN,
                          id,
                        )}" alt="LGTM" />`}
                      >
                        <ListItemText
                          secondary='HTML'
                          secondaryTypographyProps={{
                            sx: { textAlign: 'center' },
                          }}
                        />
                      </CopyToClipBoard>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Paper>
            </ClickAwayListener>
          </Popper>

          {/* ??????????????? */}
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

          {/* ?????? */}
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
