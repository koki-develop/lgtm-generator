import React from 'react';
import { Lgtm } from '~/types/lgtm';
import urlJoin from 'url-join';

type LgtmCardProps = {
  lgtm: Lgtm;
};

const LgtmCard: React.VFC<LgtmCardProps> = (props: LgtmCardProps) => {
  return (
    <img
      src={urlJoin(process.env.NEXT_PUBLIC_LGTMS_ORIGIN, props.lgtm.id)}
      alt="LGTM"
    />
  );
};

export default LgtmCard;
