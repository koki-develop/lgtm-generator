import React, { useState } from 'react';
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
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  grey,
  orange,
  pink,
} from '@material-ui/core/colors';
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
  favorite: boolean;
  onFavorite: () => void;
  onUnfavorite: () => void;
};

const LgtmCard: React.VFC<LgtmCardProps> = React.memo((props: LgtmCardProps) => {
  const classes = useStyles();

  const { enqueueSuccess } = useToast();
  const [copyButtonEl, setCopyButtonEl] = useState<HTMLButtonElement>();

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

  return (
    <Card>
      <CardContent className={classes.cardContent}>
        <Box className={classes.imgContainer}>
          <img
            className={classes.img}
            src={urlJoin(process.env.NEXT_PUBLIC_LGTMS_ORIGIN, props.id)}
            alt="LGTM"
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
                    text={`![LGTM](${urlJoin(process.env.NEXT_PUBLIC_LGTMS_ORIGIN, props.id)})`}
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
                    text={`<img src="${urlJoin(process.env.NEXT_PUBLIC_LGTMS_ORIGIN, props.id)}" alt="LGTM" />`}
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
          {props.favorite ? (
            <Button
              className={classes.unfavoriteButton}
              onClick={props.onUnfavorite}
            >
              <FavoriteIcon fontSize='small' />
            </Button>
          ) : (
            <Button
              className={classes.favoriteButton}
              onClick={props.onFavorite}
            >
              <FavoriteBorderIcon fontSize='small' />
            </Button>
          )}
          <Button
            className={classes.reportButton}
          >
            <FlagOutlinedIcon fontSize='small' />
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
});

LgtmCard.displayName = 'LgtmCard';

export default LgtmCard;
