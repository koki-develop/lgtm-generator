import React from 'react';
import { Grid } from '@material-ui/core';
import LgtmCard from './lgtmCard';

type LgtmCardListProps = {
  ids: string[];
};

const LgtmCardList: React.VFC<LgtmCardListProps> = (
  props: LgtmCardListProps,
) => {
  return (
    <Grid container spacing={2}>
      {props.ids.map(id => (
        <Grid key={id} item xs={6} sm={4} md={3}>
          <LgtmCard id={id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default LgtmCardList;
