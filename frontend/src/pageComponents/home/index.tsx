import React, { useState } from 'react';
import Layout from '~/layout';
import Tabs, { TabValue } from './tabs';
import Field from '~/components/field';
import LgtmsPanel from './lgtmsPanel';
import SearchImagesPanel from './searchImagesPanel';
import FavoritesPanel from './favoritesPanel';

const Home: React.VFC = () => {
  const [tab, setTab] = useState<TabValue>(TabValue.lgtms);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChangeTab = (value: TabValue) => {
    setTab(value);
  };

  const handleChangeErrorMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(e.currentTarget.value);
  };

  const handleClickError = () => {
    throw new Error(errorMessage);
  };

  return (
    <Layout>
      <input
        type="text"
        value={errorMessage}
        onChange={handleChangeErrorMessage}
      />
      <button onClick={handleClickError}>
        error
      </button>
      <Field>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
        />
      </Field>

      <LgtmsPanel show={tab === TabValue.lgtms} />

      <SearchImagesPanel show={tab === TabValue.searchImages} />

      <FavoritesPanel show={tab === TabValue.favorites} />
    </Layout>
  );
};

export default Home;
