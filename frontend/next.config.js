// Vercel で canvas のビルド時に `version `ZLIB_1.2.9' not found` エラーが発生する問題の対策
// 参考: https://github.com/Automattic/node-canvas/issues/1779#issuecomment-895885846
if (
  !process.env.LD_LIBRARY_PATH?.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`,
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
}

const config = {
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
  },
};

module.exports = (() => {
  if (process.env.NEXT_PUBLIC_STAGE !== 'prod') {
    return config;
  }

  return config;
})();
