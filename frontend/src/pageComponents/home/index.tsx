import React, { useEffect, useState } from 'react';
import Layout from '~/layout';
import { Lgtm } from '~/types/lgtm';
import { ApiClient } from '~/lib/apiClient';
import Tabs, { TabValue } from './tabs';
import LgtmCardList from './lgtmCardList';
import Field from '~/components/field';

const Home: React.VFC = () => {
  const [lgtms, setLgtms] = useState<Lgtm[]>([]);
  const [tab, setTab] = useState<TabValue>(TabValue.lgtm);

  const handleChangeTab = (value: TabValue) => {
    setTab(value);
  };

  useEffect(() => {
    ApiClient.getLgtms().then(lgtms => setLgtms(lgtms));
  }, []);

  return (
    <Layout>
      <Field>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
        />
      </Field>

      <Field>
        <LgtmCardList items={lgtms} />
      </Field>
    </Layout>
  );
};

export default Home;
