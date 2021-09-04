import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { favoriteIdsState } from '~/recoil/atoms';
import { Box } from '@material-ui/core';
import LgtmCardList from '../lgtmCardList';

type FavoritesPanelProps = {
  show: boolean;
};

const FavoritesPanel: React.VFC<FavoritesPanelProps> = React.memo((props: FavoritesPanelProps) => {
  const favoriteIds = useRecoilValue(favoriteIdsState);
  const [showingFavoriteIds, setShowingFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setShowingFavoriteIds(favoriteIds);
  }, [props.show]);

  return (
    <Box hidden={!props.show}>
      <LgtmCardList ids={showingFavoriteIds} />
    </Box>
  );
});

FavoritesPanel.displayName = 'FavoritesPanel';

export default FavoritesPanel;
