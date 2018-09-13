import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import markdown from 'docs/pages/getting-started/supported-platforms/supported-platforms.md';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default withRoot(Page);
