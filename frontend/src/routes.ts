export const Routes = {
  home: '/',
  precaution: '/precaution',
  privacyPolicy: '/privacy',
} as const;

export type Routes = typeof Routes[keyof typeof Routes];
