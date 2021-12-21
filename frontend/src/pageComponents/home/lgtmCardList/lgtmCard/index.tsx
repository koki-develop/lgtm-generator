import React, { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { favoriteIdsState } from '~/recoil/atoms';
import { useToast } from '~/contexts/toastProvider';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  ClickAwayListener,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popper,
} from '@material-ui/core';
import CopyToClipBoard from 'react-copy-to-clipboard';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  FileCopyOutlined as FileCopyOutlinedIcon,
  FlagOutlined as FlagOutlinedIcon,
} from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { grey, orange, pink } from '@material-ui/core/colors';
import { DataStorage } from '~/lib/dataStorage';
import { ApiClient } from '~/lib/apiClient';
import ReportForm, { Values as ReportFormValues } from './reportForm';
import urlJoin from 'url-join';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      border: '1px solid',
      borderColor: grey['A100'],
      maxHeight: 140,
      maxWidth: '100%',
    },
    imgContainer: {
      alignItems: 'center',
      display: 'flex',
      height: 150,
      justifyContent: 'center',
    },
    cardContent: {
      padding: theme.spacing(1),
    },
    cardActions: {
      justifyContent: 'center',
      paddingTop: 0,
    },
    buttonGroup: {
      maxWidth: '100%',
    },
    copyListItem: {
      textAlign: 'center',
      padding: theme.spacing(1),
    },
    copyButton: {
      borderRight: 'none !important',
    },
    favoriteButton: {
      backgroundColor: '#fff',
      borderRight: 'none !important',
      color: pink['700'],
      '&:hover': {
        backgroundColor: pink['50'],
      },
    },
    unfavoriteButton: {
      backgroundColor: pink['100'],
      borderRight: 'none !important',
      color: pink['700'],
      '&:hover': {
        backgroundColor: pink['200'],
      },
    },
    reportButton: {
      backgroundColor: orange['500'],
      color: '#fff',
      '&:hover': {
        backgroundColor: orange['700'],
      },
    },
  }),
);

type LgtmCardProps = {
  id: string;
};

const LgtmCard: React.VFC<LgtmCardProps> = React.memo(
  (props: LgtmCardProps) => {
    const classes = useStyles();

    const { enqueueSuccess, enqueueError } = useToast();
    const [favoriteIds, setFavoriteIds] = useRecoilState(favoriteIdsState);
    const [copyButtonEl, setCopyButtonEl] = useState<HTMLButtonElement>();
    const [openReportForm, setOpenReportForm] = useState<boolean>(false);
    const [reportFormValues, setReportFormValues] = useState<ReportFormValues>({
      text: '',
    });
    const [reporting, setReporting] = useState<boolean>(false);

    const handleClickFavoriteButton = () => {
      const after = [props.id, ...favoriteIds];
      setFavoriteIds(after);
      DataStorage.saveFavoriteIds(after);
    };

    const handleClickUnfavoriteButton = () => {
      const after = favoriteIds.filter(id => id !== props.id);
      setFavoriteIds(after);
      DataStorage.saveFavoriteIds(after);
    };

    const favorited = useMemo(() => {
      return favoriteIds.includes(props.id);
    }, [favoriteIds]);

    const handleClickCopyButton = (e: React.MouseEvent<HTMLButtonElement>) => {
      setCopyButtonEl(e.currentTarget);
    };

    const handleClickOutsideCopyList = () => {
      setCopyButtonEl(undefined);
    };

    const handleClickCopyLink = () => {
      enqueueSuccess('クリップボードにコピーしました');
      setCopyButtonEl(undefined);
    };

    const handleClickReportButton = () => {
      setOpenReportForm(true);
    };

    const handleCloseReportForm = () => {
      setOpenReportForm(false);
    };

    const handleChangeReportFormValues = (values: ReportFormValues) => {
      setReportFormValues(values);
    };

    const handleReport = () => {
      setReporting(true);
      ApiClient.createReport(
        props.id,
        reportFormValues.type,
        reportFormValues.text,
      )
        .then(() => {
          enqueueSuccess('送信しました');
          setReportFormValues({ text: '' });
          setOpenReportForm(false);
        })
        .catch(error => {
          console.error(error);
          enqueueError('送信に失敗しました');
        })
        .finally(() => {
          setReporting(false);
        });
    };

    return (
      <Card>
        <ReportForm
          imgSrc={urlJoin(process.env.NEXT_PUBLIC_LGTMS_ORIGIN, props.id)}
          open={openReportForm}
          onClose={handleCloseReportForm}
          onReport={handleReport}
          loading={reporting}
          values={reportFormValues}
          onChange={handleChangeReportFormValues}
        />
        <CardContent className={classes.cardContent}>
          <Box className={classes.imgContainer}>
            <img
              className={classes.img}
              src={urlJoin(process.env.NEXT_PUBLIC_LGTMS_ORIGIN, props.id)}
              alt='LGTM'
            />
          </Box>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Popper
            transition
            open={Boolean(copyButtonEl)}
            anchorEl={copyButtonEl}
            placement='top'
          >
            <ClickAwayListener onClickAway={handleClickOutsideCopyList}>
              <Paper>
                <List disablePadding>
                  <ListItem
                    className={classes.copyListItem}
                    button
                    onClick={handleClickCopyLink}
                  >
                    <CopyToClipBoard
                      text={`![LGTM](${urlJoin(
                        process.env.NEXT_PUBLIC_LGTMS_ORIGIN,
                        props.id,
                      )})`}
                    >
                      <ListItemText secondary='Markdown' />
                    </CopyToClipBoard>
                  </ListItem>
                  <Divider />
                  <ListItem
                    className={classes.copyListItem}
                    button
                    onClick={handleClickCopyLink}
                  >
                    <CopyToClipBoard
                      text={`<img src="${urlJoin(
                        process.env.NEXT_PUBLIC_LGTMS_ORIGIN,
                        props.id,
                      )}" alt="LGTM" />`}
                    >
                      <ListItemText secondary='HTML' />
                    </CopyToClipBoard>
                  </ListItem>
                </List>
              </Paper>
            </ClickAwayListener>
          </Popper>
          <ButtonGroup
            className={classes.buttonGroup}
            color='primary'
            variant='contained'
          >
            <Button
              className={classes.copyButton}
              onClick={handleClickCopyButton}
            >
              <FileCopyOutlinedIcon fontSize='small' />
            </Button>
            {favorited ? (
              <Button
                className={classes.unfavoriteButton}
                onClick={handleClickUnfavoriteButton}
              >
                <FavoriteIcon fontSize='small' />
              </Button>
            ) : (
              <Button
                className={classes.favoriteButton}
                onClick={handleClickFavoriteButton}
              >
                <FavoriteBorderIcon fontSize='small' />
              </Button>
            )}
            <Button
              className={classes.reportButton}
              onClick={handleClickReportButton}
            >
              <FlagOutlinedIcon fontSize='small' />
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    );
  },
);

LgtmCard.displayName = 'LgtmCard';

export default LgtmCard;
