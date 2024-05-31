import * as React from 'react';
import ApiPage from 'docs/src/modules/components/ApiPage';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import jsonPageContent from './button-group.json';

export default function Page(props) {
  const { descriptions, pageContent } = props;
  return (
    <BrandingCssVarsProvider>
      <ApiPage descriptions={descriptions} pageContent={pageContent} />;
    </BrandingCssVarsProvider>
  );
}

Page.getInitialProps = () => {
  const req = require.context(
    'docs/translations/api-docs/button-group',
    false,
    /\.\/button-group.*.json$/,
  );
  const descriptions = mapApiPageTranslations(req);

  return {
    descriptions,
    pageContent: jsonPageContent,
  };
};
