import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import { getLayout } from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/getting-started/quickstart/quickstart.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} disableAd />;
}

Page.getLayout = getLayout;
