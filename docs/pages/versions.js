import React from 'react';
import orderBy from 'lodash/orderBy';
import sortedUniqBy from 'lodash/sortedUniqBy';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/versions', false, /\.(md|js|tsx)$/);
const reqSource = require.context('!raw-loader!../src/pages/versions', false, /\.(js|tsx)$/);
const reqPrefix = 'pages/versions';

export default function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}

async function getBranches() {
  let branches = [];
  try {
    const result = await fetch('https://api.github.com/repos/mui-org/material-ui-docs/branches');
    branches = await result.json();
  } catch (err) {
    // Swallow the exceptions.
  }

  branches = branches || [];
  return branches;
}

Page.getInitialProps = async () => {
  const FILTERED_BRANCHES = ['latest', 'staging', 'l10n', 'next'];

  const branches = await getBranches();
  let versions = branches.map(n => n.name);
  versions = versions.filter(value => FILTERED_BRANCHES.indexOf(value) === -1);
  versions = versions.map(version => ({
    version,
    // Replace dot with dashes for Netlify branch subdomains
    url: `https://${version.replace(/\./g, '-')}.material-ui.com`,
  }));
  // Current version.
  versions.push({
    version: `v${process.env.LIB_VERSION}`,
    url: 'https://material-ui.com',
  });
  // Legacy documentation.
  versions.push({
    version: 'v0',
    url: 'https://v0.material-ui.com',
  });
  versions = orderBy(versions, 'version', 'desc');
  versions = sortedUniqBy(versions, 'version');

  return { versions };
};
