import React from 'react';
import { Lgtm } from '~/types/lgtm';
import LgtmCardListItem from './lgtmCardListItem';

type LgtmCardListProps = {
  items: Lgtm[];
};

const LgtmCardList: React.VFC<LgtmCardListProps> = (props: LgtmCardListProps) => {
  return (
    <div>
      {props.items.map(lgtm => (
        <LgtmCardListItem
          key={lgtm.id}
          lgtm={lgtm}
        />
      ))}
    </div>
  );
};

export default LgtmCardList;
