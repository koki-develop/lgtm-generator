import React from 'react';
import { Lgtm } from '~/types/lgtm';
import urlJoin from 'url-join';

type LgtmCardListItemProps = {
  lgtm: Lgtm;
};

const LgtmCardListItem: React.VFC<LgtmCardListItemProps> = (props: LgtmCardListItemProps) => {
  return (
    <img
      src={`${urlJoin(process.env.NEXT_PUBLIC_LGTMS_ORIGIN, props.lgtm.id)}`}
      style={{ width: 300 }}
      alt="LGTM"
    />
  );
};

export default LgtmCardListItem;
