import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { favoriteIdsState } from '~/recoil/atoms';
import { Box, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import LgtmCardList from '../../model/lgtm/LgtmCardList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    emptyMessage: {
      color: theme.palette.text.secondary,
      textAlign: 'center',
    },
  }),
);

type FavoritesPanelProps = {
  show: boolean;
};

const FavoritesPanel: React.VFC<FavoritesPanelProps> = React.memo(
  (props: FavoritesPanelProps) => {
    const classes = useStyles();

    const favoriteIds = useRecoilValue(favoriteIdsState);
    const [showingFavoriteIds, setShowingFavoriteIds] = useState<string[]>([]);

    useEffect(() => {
      setShowingFavoriteIds(favoriteIds);
    }, [props.show]);

    return (
      <Box hidden={!props.show}>
        {showingFavoriteIds.length === 0 ? (
          <Typography className={classes.emptyMessage}>
            お気に入りした LGTM 画像はありません。
          </Typography>
        ) : (
          <LgtmCardList ids={showingFavoriteIds} />
        )}
      </Box>
    );
  },
);

FavoritesPanel.displayName = 'FavoritesPanel';

export default FavoritesPanel;
