import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';
import { useTheme } from '@mui/material/styles';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

export default function EditPage(props) {
  const theme = useTheme();
  const { markdownLocation } = props;
  const t = useTranslate();
  const userLanguage = useUserLanguage();
  const LOCALES = { zh: 'zh-CN', pt: 'pt-BR', es: 'es-ES' };
  const CROWDIN_ROOT_URL = 'https://translate.mui.com/project/material-ui-docs/';
  const crowdInLocale = LOCALES[userLanguage] || userLanguage;
  const crowdInPath = markdownLocation.substring(0, markdownLocation.lastIndexOf('/'));

  return (
    <Button
      component="a"
      href={
        userLanguage === 'en'
          ? `${process.env.SOURCE_CODE_ROOT_URL}${markdownLocation}`
          : `${CROWDIN_ROOT_URL}${crowdInLocale}#/staging${crowdInPath}`
      }
      target="_blank"
      rel="noopener nofollow"
      size="small"
      endIcon={<EditRoundedIcon />}
      data-ga-event-category={userLanguage === 'en' ? undefined : 'l10n'}
      data-ga-event-action={userLanguage === 'en' ? undefined : 'edit-button'}
      data-ga-event-label={userLanguage === 'en' ? undefined : userLanguage}
      sx={{
        px: 1,
        fontWeight: 500,
        fontSize: theme.typography.pxToRem(12.5),
        color:
          theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
      }}
    >
      {t('editPage')}
    </Button>
  );
}

EditPage.propTypes = {
  markdownLocation: PropTypes.string.isRequired,
};
