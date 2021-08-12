export const Routes = {
  home: '/',
  privacyPolicy: '/privacy',
} as const;

export type Routes = typeof Routes[keyof typeof Routes];
