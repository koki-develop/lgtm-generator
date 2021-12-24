import React, { useCallback, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import CopyToClipBoard from 'react-copy-to-clipboard';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { orange, pink } from '@mui/material/colors';
import urlJoin from 'url-join';
import {
  useAddFavoriteId,
  useFavoriteIds,
  useRemoveFavoriteId,
} from '~/components/model/lgtm/LgtmHooks';
import { useToast } from '~/components/providers/ToastProvider';
import ReportForm from '~/components/model/report/ReportForm';

type LgtmCardButtonGroupProps = {
  id: string;
};

const LgtmCardButtonGroup: React.VFC<LgtmCardButtonGroupProps> = React.memo(
  props => {
    const { id } = props;

    const { enqueueSuccess } = useToast();
    const { addFavoriteId } = useAddFavoriteId();
    const { removeFavoriteId } = useRemoveFavoriteId();

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
      enqueueSuccess('クリップボードにコピーしました');
      setCopyButtonEl(null);
    }, [enqueueSuccess]);

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
        <ButtonGroup
          color='primary'
          variant='contained'
          sx={{
            maxWidth: '100%',
          }}
        >
          {/* コピー */}
          <Button onClick={handleClickCopyButton}>
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
                  <ListItem
                    button
                    onClick={handleClickCopyLink}
                    sx={{
                      textAlign: 'center',
                      p: 1,
                    }}
                  >
                    <CopyToClipBoard
                      text={`![LGTM](${urlJoin(
                        process.env.NEXT_PUBLIC_LGTMS_ORIGIN,
                        id,
                      )})`}
                    >
                      <ListItemText secondary='Markdown' />
                    </CopyToClipBoard>
                  </ListItem>
                  <Divider />
                  <ListItem
                    button
                    onClick={handleClickCopyLink}
                    sx={{
                      textAlign: 'center',
                      p: 1,
                    }}
                  >
                    <CopyToClipBoard
                      text={`<img src="${urlJoin(
                        process.env.NEXT_PUBLIC_LGTMS_ORIGIN,
                        id,
                      )}" alt="LGTM" />`}
                    >
                      <ListItemText secondary='HTML' />
                    </CopyToClipBoard>
                  </ListItem>
                </List>
              </Paper>
            </ClickAwayListener>
          </Popper>

          {/* お気に入り */}
          {favorited ? (
            <Button
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
