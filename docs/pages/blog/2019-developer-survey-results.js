import * as React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import { docs } from './2019-developer-survey-results.md?@material-ui/markdown';

export default function Page() {
  return <TopLayoutBlog docs={docs} />;
}
