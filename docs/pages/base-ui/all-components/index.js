import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import { getLayout } from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/all-components/all-components.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} disableToc />;
}

Page.getLayout = getLayout;
