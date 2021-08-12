import React, { useEffect, useState } from 'react';
import Layout from '~/layout';
import { Lgtm } from '~/types/lgtm';
import { ApiClient } from '~/lib/apiClient';
import LgtmCardList from './lgtmCardList';

const Home: React.VFC = () => {
  const [lgtms, setLgtms] = useState<Lgtm[]>([]);

  useEffect(() => {
    ApiClient.getLgtms().then(lgtms => setLgtms(lgtms));
  }, []);

  return (
    <Layout>
      <LgtmCardList items={lgtms} />
    </Layout>
  );
};

export default Home;
