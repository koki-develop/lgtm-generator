import React from 'react';
import { Paper, Tabs as MuiTabs, Tab } from '@mui/material';

export const TabValue = {
  lgtms: 'lgtms',
  searchImages: 'search_images',
  favorites: 'favorites',
} as const;

export type TabValue = typeof TabValue[keyof typeof TabValue];

type TabsProps = {
  value: TabValue;
  onChange: (value: TabValue) => void;
};

const Tabs: React.VFC<TabsProps> = React.memo((props: TabsProps) => {
  const handleChangeValue = (_: React.ChangeEvent<unknown>, value: string) => {
    props.onChange(value as TabValue);
  };

  return (
    <Paper>
      <MuiTabs
        onChange={handleChangeValue}
        value={props.value}
        variant='fullWidth'
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label='LGTM' value={TabValue.lgtms} />
        <Tab label='画像検索' value={TabValue.searchImages} />
        <Tab label='お気に入り' value={TabValue.favorites} />
      </MuiTabs>
    </Paper>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
