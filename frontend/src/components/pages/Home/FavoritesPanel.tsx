import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LgtmCardList from '~/components/model/lgtm/LgtmCardList';
import { useFavoriteIds } from '~/hooks/lgtmHooks';
import { useTranslate } from '~/hooks/translateHooks';

type FavoritesPanelProps = {
  show: boolean;
};

const FavoritesPanel: React.VFC<FavoritesPanelProps> = React.memo(props => {
  const { show } = props;

  const favoriteIds = useFavoriteIds();
  const [showingFavoriteIds, setShowingFavoriteIds] = useState<string[]>([]);
  const { t } = useTranslate();

  useEffect(() => {
    if (!show) {
      setShowingFavoriteIds(favoriteIds);
    }
  }, [favoriteIds, show]);

  return (
    <Box data-testid='favorites-panel' hidden={!show}>
      {showingFavoriteIds.length === 0 ? (
        <Typography
          data-testid='no-favorites-text'
          sx={{
            color: theme => theme.palette.text.secondary,
            textAlign: 'center',
          }}
        >
          {t.NO_FAVORITES}
        </Typography>
      ) : (
        <LgtmCardList ids={showingFavoriteIds} />
      )}
    </Box>
  );
});

FavoritesPanel.displayName = 'FavoritesPanel';

export default FavoritesPanel;
