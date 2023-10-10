/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';
import {
  ClassesFormatedParams,
  getHash,
} from 'docs/src/modules/components/ApiPage/list/ClassesList';

const StyledTable = styled('table')(
  ({ theme }) => ({
    '& .table-headers': {
      paddingTop: 8,
      paddingBottom: 8,
      textAlign: 'left',
      fontWeight: theme.typography.fontWeightSemiBold,
      fontSize: theme.typography.pxToRem(14),
    },
    '& tr': {
      '&:hover': {
        backgroundColor: alpha(darkTheme.palette.grey[50], 0.5),
      },
    },
    '& .rule-name': {
      padding: '0 4px',
      borderRadius: 5,
      border: '1px solid',
      borderColor: alpha(darkTheme.palette.primary[100], 0.5),
      backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& tr': {
        '&:hover': {
          backgroundColor: alpha(darkTheme.palette.primaryDark[800], 0.5),
        },
      },
      '& .rule-name': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
        backgroundColor: alpha(darkTheme.palette.primary[900], 0.5),
      },
    },
  }),
);

interface ClassesTableProps {
  classes: ClassesFormatedParams[];
}

export default function ClassesTable(props: ClassesTableProps) {
  const { classes } = props;
  return (
    <StyledTable>
      <thead>
        <tr>
          <th className="table-headers">Rule name</th>
          <th className="table-headers">Description</th>
        </tr>
      </thead>
      <tbody>
        {classes.map((params) => {
          const { className, cssClassName, description, componentName } = params;

          return (
            <tr key={className} id={getHash({ componentName, className })}>
              <td className="MuiApi-table-global-class">
                <span className="rule-name">{cssClassName}</span>
              </td>
              <td>
                <span
                  className="MuiApi-table-description"
                  dangerouslySetInnerHTML={{
                    __html: description || '',
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}
