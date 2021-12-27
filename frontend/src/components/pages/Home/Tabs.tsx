import React, { useCallback } from 'react';
import { Paper, Tabs as MuiTabs, Tab } from '@mui/material';
import { useTranslate } from '~/hooks/translateHooks';

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

const Tabs: React.VFC<TabsProps> = React.memo(props => {
  const { value, onChange } = props;
  const { t } = useTranslate();

  const handleChangeValue = useCallback(
    (_: React.ChangeEvent<unknown>, value: string) => {
      onChange(value as TabValue);
    },
    [onChange],
  );

  return (
    <Paper>
      <MuiTabs
        onChange={handleChangeValue}
        value={value}
        variant='fullWidth'
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label={t.LGTM} value={TabValue.lgtms} />
        <Tab label={t.IMAGE_SEARCH} value={TabValue.searchImages} />
        <Tab label={t.FAVORITES} value={TabValue.favorites} />
      </MuiTabs>
    </Paper>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
