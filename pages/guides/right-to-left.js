import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/guides/right-to-left/right-to-left.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/guides/right-to-left/Direction.js': {
          js: require('docs/pages/guides/right-to-left/Direction').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/guides/right-to-left/Direction'), 'utf8')
`,
        },
        'pages/guides/right-to-left/RtlOptOut.js': {
          js: require('docs/pages/guides/right-to-left/RtlOptOut').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/guides/right-to-left/RtlOptOut'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
