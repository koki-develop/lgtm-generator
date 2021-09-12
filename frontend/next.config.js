const { withSentryConfig } = require('@sentry/nextjs');

const config = {};

const SentryWebpackPluginOptions = {
  silent: true,
};

module.exports = (() => {
  if (process.env.NEXT_PUBLIC_STAGE !== 'prod') {
    return config;
  }

  return withSentryConfig(config, SentryWebpackPluginOptions);
})();
