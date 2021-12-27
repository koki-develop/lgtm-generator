export const Routes = {
  home: '/',
  precautions: '/precautions',
  privacyPolicy: '/privacy',
} as const;

export type Routes = typeof Routes[keyof typeof Routes];
