/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import kebabCase from 'lodash/kebabCase';
import { ComponentClassDefinition } from '@mui-internal/docs-utilities';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ExpandableApiItem, {
  ApiItemContaier,
} from 'docs/src/modules/components/ApiPage/list/ExpandableApiItem';
import {
  brandingLightTheme as lightTheme,
  brandingDarkTheme as darkTheme,
} from 'docs/src/modules/brandingTheme';
import ApiAlert from 'docs/src/modules/components/ApiPage/ApiAlert';

const StyledApiItem = styled(ExpandableApiItem)(
  ({ theme }) => ({
    '& p': {
      margin: 0,
    },
    '& .prop-list-title': {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightSemiBold,
      color: theme.palette.text.primary,
      paddingRight: 5,
      whiteSpace: 'nowrap',
      margin: 0,
    },
    '& .prop-list-class': {
      margin: 0,
    },
    '&.classes-list-deprecated-item': {
      '& .MuiApi-item-note': {
        color: `var(--muidocs-palette-warning-700, ${lightTheme.palette.warning[700]})`,
      },
    },
    '& .classes-list-alert': {
      marginTop: 12,
      marginBottom: 16,
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .prop-list-title': {
        color: `var(--muidocs-palette-grey-50, ${darkTheme.palette.grey[50]})`,
      },
      '&.classes-list-deprecated-item': {
        '& .MuiApi-item-note': {
          color: `var(--muidocs-palette-warning-400, ${lightTheme.palette.warning[400]})`,
        },
      },
    },
  }),
);

type HashParams = { componentName: string; className: string };

export function getHash({ componentName, className }: HashParams) {
  return `${kebabCase(componentName)}-classes-${className}`;
}

type ClassesListProps = {
  componentName: string;
  classes: ComponentClassDefinition[];
  displayOption: 'collapsed' | 'expanded';
  displayClassKeys?: boolean;
};

export default function ClassesList(props: ClassesListProps) {
  const { classes, displayOption, componentName, displayClassKeys } = props;
  const t = useTranslate();

  return (
    <ApiItemContaier>
      {classes.map((classDefinition) => {
        const { className, key, description, isGlobal, isDeprecated, deprecationInfo } =
          classDefinition;

        return (
          <StyledApiItem
            id={getHash({ componentName, className: key })}
            key={key}
            note={
              (isGlobal && t('api-docs.state')) || (isDeprecated && t('api-docs.deprecated')) || ''
            }
            title={`.${className}`}
            type="classes"
            displayOption={displayOption}
            isExtendable={!!description}
            className={isDeprecated ? 'classes-list-deprecated-item' : ''}
          >
            {description && <p dangerouslySetInnerHTML={{ __html: description }} />}
            {isDeprecated && (
              <ApiAlert className="MuiApi-collapsible classes-list-alert">
                {t('api-docs.deprecated')}
                {deprecationInfo && (
                  <React.Fragment>
                    {' - '}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: deprecationInfo,
                      }}
                    />
                  </React.Fragment>
                )}
              </ApiAlert>
            )}
            {displayClassKeys && !isGlobal && (
              <p className="prop-list-class">
                <span className="prop-list-title">{'Rule name'}:</span>
                <code className="Api-code">{key}</code>
              </p>
            )}
          </StyledApiItem>
        );
      })}
    </ApiItemContaier>
  );
}
