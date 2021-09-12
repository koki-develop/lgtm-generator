const { withSentryConfig } = require('@sentry/nextjs');

const SentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig({}, SentryWebpackPluginOptions);
