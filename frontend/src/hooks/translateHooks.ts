import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Translate } from '~/locales/translate';
import { ja } from '~/locales/ja';
import { en } from '~/locales/en';

export const useTranslate = (): { t: Translate; locale: string } => {
  const { locale } = useRouter();

  const t = useMemo(() => {
    switch (locale) {
      case 'en':
        return en;
      default:
        return ja;
    }
  }, [locale]);

  return { locale, t };
};
