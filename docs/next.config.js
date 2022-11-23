const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const nextTranspileModules = require('next-transpile-modules');
const pkg = require('../package.json');
const withDocsInfra = require('./nextConfigDocsInfra');
const { findPages } = require('./src/modules/utils/find');
const { LANGUAGES, LANGUAGES_SSR, LANGUAGES_IGNORE_PAGES } = require('./src/modules/constants');

const withTM = nextTranspileModules([
  '@mui/material',
  '@mui/docs',
  '@mui/icons-material',
  '@mui/lab',
  '@mui/styled-engine',
  '@mui/styles',
  '@mui/system',
  '@mui/private-theming',
  '@mui/utils',
  '@mui/base',
  '@mui/material-next',
  '@mui/joy',
]);

const l10nPRInNetlify = /^l10n_/.test(process.env.HEAD) && process.env.NETLIFY === 'true';
const vercelDeploy = Boolean(process.env.VERCEL);
const isDeployPreview = Boolean(process.env.PULL_REQUEST_ID);
// For crowdin PRs we want to build all locales for testing.
const buildOnlyEnglishLocale = isDeployPreview && !l10nPRInNetlify && !vercelDeploy;

module.exports = withTM(
  withDocsInfra({
    webpack: (config, options) => {
      const plugins = config.plugins.slice();

      if (process.env.DOCS_STATS_ENABLED) {
        plugins.push(
          // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            generateStatsFile: true,
            analyzerPort: options.isServer ? 8888 : 8889,
            reportTitle: `${options.isServer ? 'server' : 'client'} docs bundle`,
            // Will be available at `.next/${statsFilename}`
            statsFilename: `stats-${options.isServer ? 'server' : 'client'}.json`,
          }),
        );
      }

      // next includes node_modules in webpack externals. Some of those have dependencies
      // on the aliases defined above. If a module is an external those aliases won't be used.
      // We need tell webpack to not consider those packages as externals.
      if (
        options.isServer &&
        // Next executes this twice on the server with React 18 (once per runtime).
        // We only care about Node runtime at this point.
        (options.nextRuntime === undefined || options.nextRuntime === 'nodejs')
      ) {
        const [nextExternals, ...externals] = config.externals;

        config.externals = [
          (ctx, callback) => {
            const { request } = ctx;
            const hasDependencyOnRepoPackages = [
              'notistack',
              '@mui/x-data-grid',
              '@mui/x-data-grid-pro',
              '@mui/x-date-pickers',
              '@mui/x-date-pickers-pro',
              '@mui/x-data-grid-generator',
              '@mui/x-license-pro',
            ].some((dep) => request.startsWith(dep));

            if (hasDependencyOnRepoPackages) {
              return callback(null);
            }
            return nextExternals(ctx, callback);
          },
          ...externals,
        ];
      }

      config.module.rules.forEach((r) => {
        r.resourceQuery = { not: [/raw/] };
      });

      return {
        ...config,
        plugins,
        resolve: {
          ...config.resolve,
          // resolve .tsx first
          extensions: [
            '.tsx',
            ...config.resolve.extensions.filter((extension) => extension !== '.tsx'),
          ],
          alias: {
            ...config.resolve.alias,
            '@mui/material': path.resolve(__dirname, '../packages/mui-material/src'),
            '@mui/docs': path.resolve(__dirname, '../packages/mui-docs/src'),
            '@mui/icons-material': path.resolve(__dirname, '../packages/mui-icons-material/lib'),
            '@mui/lab': path.resolve(__dirname, '../packages/mui-lab/src'),
            '@mui/styled-engine': path.resolve(__dirname, '../packages/mui-styled-engine/src'),
            '@mui/styles': path.resolve(__dirname, '../packages/mui-styles/src'),
            '@mui/system': path.resolve(__dirname, '../packages/mui-system/src'),
            '@mui/private-theming': path.resolve(__dirname, '../packages/mui-private-theming/src'),
            '@mui/utils': path.resolve(__dirname, '../packages/mui-utils/src'),
            '@mui/base': path.resolve(__dirname, '../packages/mui-base/src'),
            '@mui/material-next': path.resolve(__dirname, '../packages/mui-material-next/src'),
            '@mui/joy': path.resolve(__dirname, '../packages/mui-joy/src'),
            docs: path.resolve(__dirname, './'),
            modules: path.resolve(__dirname, '../modules'),
            pages: path.resolve(__dirname, './pages'),
          },
        },
        module: {
          ...config.module,
          rules: config.module.rules.concat([
            {
              test: /\.md$/,
              oneOf: [
                {
                  resourceQuery: /@mui\/markdown/,
                  use: [options.defaultLoaders.babel, require.resolve('@mui/markdown/loader')],
                },
                {
                  // used in some /getting-started/templates
                  type: 'asset/source',
                },
              ],
            },
            {
              resourceQuery: /raw/,
              type: 'asset/source',
            },
          ]),
        },
      };
    },
    env: {
      GITHUB_AUTH: process.env.GITHUB_AUTH
        ? `Basic ${Buffer.from(process.env.GITHUB_AUTH).toString('base64')}`
        : null,
      LIB_VERSION: pkg.version,
      FEEDBACK_URL: process.env.FEEDBACK_URL,
      SLACK_FEEDBACKS_TOKEN: process.env.SLACK_FEEDBACKS_TOKEN,
      SOURCE_CODE_ROOT_URL: 'https://github.com/mui/material-ui/blob/master', // #default-branch-switch
      SOURCE_CODE_REPO: 'https://github.com/mui/material-ui',
      BUILD_ONLY_ENGLISH_LOCALE: buildOnlyEnglishLocale,
    },
    // Next.js provides a `defaultPathMap` argument, we could simplify the logic.
    // However, we don't in order to prevent any regression in the `findPages()` method.
    exportPathMap: () => {
      const pages = findPages();
      const map = {};

      function traverse(pages2, userLanguage) {
        const prefix = userLanguage === 'en' ? '' : `/${userLanguage}`;

        pages2.forEach((page) => {
          // The experiments pages are only meant for experiments, they shouldn't leak to production.
          if (
            (page.pathname.startsWith('/experiments/') || page.pathname === '/experiments') &&
            process.env.DEPLOY_ENV === 'production'
          ) {
            return;
          }
          // The blog is not translated
          if (userLanguage !== 'en' && LANGUAGES_IGNORE_PAGES(page.pathname)) {
            return;
          }
          if (!page.children) {
            // map api-docs to api
            // i: /api-docs/* > /api/* (old structure)
            // ii: /*/api-docs/* > /*/api/* (for new structure)
            map[`${prefix}${page.pathname.replace(/^(\/[^/]+)?\/api-docs\/(.*)/, '$1/api/$2')}`] = {
              page: page.pathname,
              query: {
                userLanguage,
              },
            };
            return;
          }

          traverse(page.children, userLanguage);
        });
      }

      // We want to speed-up the build of pull requests.
      // For this, consider only English language on deploy previews, except for crowdin PRs.
      if (buildOnlyEnglishLocale) {
        // eslint-disable-next-line no-console
        console.log('Considering only English for SSR');
        traverse(pages, 'en');
      } else {
        // eslint-disable-next-line no-console
        console.log('Considering various locales for SSR');
        LANGUAGES_SSR.forEach((userLanguage) => {
          traverse(pages, userLanguage);
        });
      }

      return map;
    },
    // rewrites has no effect when run `next export` for production
    rewrites: async () => {
      return [
        { source: `/:lang(${LANGUAGES.join('|')})?/:rest*`, destination: '/:rest*' },
        // Make sure to include the trailing slash if `trailingSlash` option is set
        { source: '/api/:rest*/', destination: '/api-docs/:rest*/' },
        { source: `/static/x/:rest*`, destination: 'http://0.0.0.0:3001/static/x/:rest*' },
      ];
    },
  }),
);
