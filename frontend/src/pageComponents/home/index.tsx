import React, { useEffect, useState } from 'react';
import { Lgtm } from '~/types/lgtm';
import { ApiClient } from '~/lib/apiClient';
import LgtmCardList from './lgtmCardList';

const Home: React.VFC = () => {
  const [lgtms, setLgtms] = useState<Lgtm[]>([]);

  useEffect(() => {
    ApiClient.getLgtms().then(lgtms => setLgtms(lgtms));
  }, []);

  return (
    <div>
      <LgtmCardList items={lgtms} />
    </div>
  );
};

export default Home;
