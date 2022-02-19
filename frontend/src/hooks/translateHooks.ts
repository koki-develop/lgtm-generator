import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { en } from '~/locales/en';
import { ja } from '~/locales/ja';
import { Translate } from '~/locales/translate';

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
