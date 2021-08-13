import React from 'react';
import {
  Paper,
  Tabs as MuiTabs,
  Tab,
} from '@material-ui/core';

export const TabValue = {
  lgtm: 'lgtm',
  searchImage: 'search_image',
  favorite: 'favorite',
} as const;

export type TabValue = typeof TabValue[keyof typeof TabValue];

type TabsProps = {
  value: TabValue;
  onChange: (value: TabValue) => void;
};

const Tabs: React.VFC<TabsProps> = (props: TabsProps) => {
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
        <Tab
          label='LGTM'
          value={TabValue.lgtm}
        />
        <Tab
          label='画像検索'
          value={TabValue.searchImage}
        />
        <Tab
          label='お気に入り'
          value={TabValue.favorite}
        />
      </MuiTabs>
    </Paper>
  );
};

export default Tabs;
