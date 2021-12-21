import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { favoriteIdsState } from '~/recoil/atoms';
import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
