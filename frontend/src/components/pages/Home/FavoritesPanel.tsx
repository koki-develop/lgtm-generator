import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { favoriteIdsState } from '~/recoil/atoms';
import LgtmCardList from '../../model/lgtm/LgtmCardList';

type FavoritesPanelProps = {
  show: boolean;
};

const FavoritesPanel: React.VFC<FavoritesPanelProps> = React.memo(props => {
  const { show } = props;

  const favoriteIds = useRecoilValue(favoriteIdsState);
  const [showingFavoriteIds, setShowingFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    if (!show) {
      setShowingFavoriteIds(favoriteIds);
    }
  }, [favoriteIds, show]);

  return (
    <Box hidden={!show}>
      {showingFavoriteIds.length === 0 ? (
        <Typography
          sx={{
            color: theme => theme.palette.text.secondary,
            textAlign: 'center',
          }}
        >
          お気に入りした LGTM 画像はありません。
        </Typography>
      ) : (
        <LgtmCardList ids={showingFavoriteIds} />
      )}
    </Box>
  );
});

FavoritesPanel.displayName = 'FavoritesPanel';

export default FavoritesPanel;
