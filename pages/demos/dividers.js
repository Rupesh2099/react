import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/demos/dividers/dividers.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/dividers/ListDividers.js': {
          js: require('docs/pages/demos/dividers/ListDividers').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/dividers/ListDividers'), 'utf8')
`,
        },
        'pages/demos/dividers/InsetDividers.js': {
          js: require('docs/pages/demos/dividers/InsetDividers').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/pages/demos/dividers/InsetDividers'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
