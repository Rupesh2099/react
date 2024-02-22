import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/styles/api/api.md?@mui/internal-markdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
