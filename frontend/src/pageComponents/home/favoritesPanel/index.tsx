import React from 'react';
import { useRecoilValue } from 'recoil';
import { favoriteIdsState } from '~/recoil/atoms';
import LgtmCardList from '../lgtmCardList';

const FavoritesPanel: React.VFC = React.memo(() => {
  const favoriteIds = useRecoilValue(favoriteIdsState);

  return (
    <LgtmCardList ids={favoriteIds} />
  );
});

FavoritesPanel.displayName = 'FavoritesPanel';

export default FavoritesPanel;
