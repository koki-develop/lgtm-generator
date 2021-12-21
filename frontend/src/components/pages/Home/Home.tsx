import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Layout from '~/components/Layout';
import Tabs, { TabValue } from './Tabs';
import Field from '~/components/utils/Field';
import LgtmsPanel from '../../../pageComponents/home/lgtmsPanel';
import SearchImagesPanel from './SearchImagesPanel';
import FavoritesPanel from '../../../pageComponents/home/favoritesPanel';

const Home: React.VFC = () => {
  const router = useRouter();
  const tab = useMemo(() => {
    return Object.values(TabValue).find(v => v === router.query.tab) || 'lgtms';
  }, [router.query.tab]);

  const handleChangeTab = (value: TabValue) => {
    router.replace({ search: `tab=${value}` });
  };

  return (
    <Layout>
      <Field>
        <Tabs value={tab} onChange={handleChangeTab} />
      </Field>

      <LgtmsPanel show={tab === TabValue.lgtms} />

      <SearchImagesPanel show={tab === TabValue.searchImages} />

      <FavoritesPanel show={tab === TabValue.favorites} />
    </Layout>
  );
};

export default Home;
