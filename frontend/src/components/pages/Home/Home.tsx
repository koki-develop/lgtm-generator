import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import Layout from '~/components/Layout';
import Field from '~/components/utils/Field';
import FavoritesPanel from './FavoritesPanel';
import LgtmsPanel from './LgtmsPanel';
import SearchImagesPanel from './SearchImagesPanel';
import Tabs, { TabValue } from './Tabs';

const Home: React.VFC = React.memo(() => {
  const router = useRouter();

  const tab = useMemo(() => {
    return Object.values(TabValue).find(v => v === router.query.tab) || 'lgtms';
  }, [router.query.tab]);

  const handleChangeTab = useCallback(
    (value: TabValue) => {
      router.replace({
        search: value === TabValue.lgtms ? '' : `tab=${value}`,
      });
    },
    [router],
  );

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
});

Home.displayName = 'Home';

export default Home;
