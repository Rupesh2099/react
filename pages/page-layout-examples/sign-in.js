import React from 'react';
import withRoot from 'docs/src/components/withRoot';
import Head from 'docs/src/components/Head';
import SignIn from 'docs/pages/page-layout-examples/sign-in/SignIn';

function Page() {
  return (
    <React.Fragment>
      <Head
        title="Sign-in page layout example - Material-UI"
        description="An example layout for creating a sign-in page."
      />
      <SignIn />
    </React.Fragment>
  );
}

export default withRoot(Page);
