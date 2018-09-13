import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/demos/expansion-panels/expansion-panels.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/expansion-panels/DetailedExpansionPanel.js': {
          js: require('docs/pages/demos/expansion-panels/DetailedExpansionPanel').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require
    .resolve('docs/pages/demos/expansion-panels/DetailedExpansionPanel'), 'utf8')
`,
        },
        'pages/demos/expansion-panels/SimpleExpansionPanel.js': {
          js: require('docs/pages/demos/expansion-panels/SimpleExpansionPanel').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require
    .resolve('docs/pages/demos/expansion-panels/SimpleExpansionPanel'), 'utf8')
`,
        },
        'pages/demos/expansion-panels/ControlledExpansionPanels.js': {
          js: require('docs/pages/demos/expansion-panels/ControlledExpansionPanels').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require
    .resolve('docs/pages/demos/expansion-panels/ControlledExpansionPanels'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
