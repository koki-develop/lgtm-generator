import React, { useState } from 'react';
import Layout from '~/layout';
import Tabs, { TabValue } from './tabs';
import Field from '~/components/field';
import LgtmsPanel from './lgtmsPanel';
import SearchImagesPanel from './searchImagesPanel';
import FavoritesPanel from './favoritesPanel';

const Home: React.VFC = () => {
  const [tab, setTab] = useState<TabValue>(TabValue.lgtms);

  const handleChangeTab = (value: TabValue) => {
    setTab(value);
  };

  return (
    <Layout>
      <Field>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
        />
      </Field>

      <Field hidden={tab !== TabValue.lgtms}>
        <LgtmsPanel />
      </Field>

      <Field hidden={tab !== TabValue.searchImages}>
        <SearchImagesPanel />
      </Field>

      <Field hidden={tab !== TabValue.favorites}>
        <FavoritesPanel />
      </Field>
    </Layout>
  );
};

export default Home;
