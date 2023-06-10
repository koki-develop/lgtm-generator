import { useRouter } from 'next/router';
import React from 'react';

export const createTranslate = <
  T extends { [key: string]: { ja: React.ReactNode; en: React.ReactNode } },
>(
  translate: T,
) => {
  const useTranslate = () => {
    const { locale } = useRouter();
    const t = React.useCallback(
      (key: keyof T) => {
        return translate[key][locale];
      },
      [locale],
    );

    return { t };
  };
  return useTranslate;
};
