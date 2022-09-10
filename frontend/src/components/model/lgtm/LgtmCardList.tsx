import { Grid } from '@mui/material';
import React from 'react';
import LgtmCard from '~/components/model/lgtm/LgtmCard';

type LgtmCardListProps = {
  ids: string[];
};

const LgtmCardList: React.FC<LgtmCardListProps> = React.memo(props => {
  const { ids } = props;

  return (
    <Grid container spacing={2}>
      {ids.map(id => (
        <Grid key={id} item xs={6} sm={4} md={3}>
          <LgtmCard id={id} />
        </Grid>
      ))}
    </Grid>
  );
});

LgtmCardList.displayName = 'LgtmCardList';

export default LgtmCardList;
