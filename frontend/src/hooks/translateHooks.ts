import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Translate } from '~/locales/translate';
import { ja } from '~/locales/ja';

export const useTranslate = (): { t: Translate } => {
  const { locale } = useRouter();

  const t = useMemo(() => {
    switch (locale) {
      case 'en':
        return;
      default:
        return ja;
    }
  }, [locale]);

  return { t };
};
