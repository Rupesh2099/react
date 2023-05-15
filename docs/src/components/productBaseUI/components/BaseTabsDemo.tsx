import * as React from 'react';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import TabsUnstyled from '@mui/base/Tabs';
import TabsListUnstyled from '@mui/base/TabsList';
import TabPanelUnstyled from '@mui/base/TabPanel';
import TabUnstyled from '@mui/base/Tab';
import { styled, GlobalStyles } from '@mui/system';

const tabListStyles = `
  min-width: 300px;
  background-color: var(--muidocs-palette-primary-main);
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: var(--muidocs-shadows-2);
`;
const StyledTabsList = styled('div')(tabListStyles);

const tabPanelStyles = `
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;
const StyledTabPanel = styled('div')(tabPanelStyles);

const tabStyles = `
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:focus {
    color: #fff;
    outline: 3px solid var(--muidocs-palette-primary-200);
  }

  &.Mui-selected {
    background-color: #fff;
    color: var(--muidocs-palette-primary-main);
  }
`;
const StyledTab = styled('button')(tabStyles);

export default function BaseTabsDemo({ styling }: { styling: 'system' | 'tailwindcss' | 'css' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        height: '100%',
        py: 2,
      }}
    >
      {styling === 'css' && (
        <GlobalStyles
          styles={`.MuiTabsList-root{${tabListStyles}};.MuiTabPanel-root{${tabPanelStyles}};.MuiTab-root{${tabStyles}}`}
        />
      )}
      {styling === 'tailwindcss' ? (
        <React.Fragment>
          <GlobalStyles styles=".m-\[6px\]{margin:6px}.mb-\[16px\]{margin-bottom:16px}.block{display:block}.flex{display:flex}.hidden{display:none}.w-full{width:100%}.min-w-\[300px\]{min-width:300px}.cursor-pointer{cursor:pointer}.content-between{align-content:space-between}.items-center{align-items:center}.justify-center{justify-content:center}.rounded-\[12px\]{border-radius:12px}.rounded-\[7px\]{border-radius:7px}.border-none{border-style:none}.\!bg-white{--tw-bg-opacity:1!important;background-color:rgb(255 255 255/var(--tw-bg-opacity))!important}.bg-\[--muidocs-palette-primary-main\]{background-color:var(--muidocs-palette-primary-main)}.bg-transparent{background-color:transparent}.p-\[12px\]{padding:12px}.text-\[0\.875rem\]{font-size:.875rem}.font-bold{font-weight:700}.\!text-\[--muidocs-palette-primary-main\]{color:var(--muidocs-palette-primary-main)!important}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.\[--muidocs-palette-primary-main\:\#007FFF\]{--muidocs-palette-primary-main:#007FFF}.\[box-shadow\:var\(--muidocs-shadows-2\)\]{box-shadow:var(--muidocs-shadows-2)}.\[font-family\:IBM_Plex_sans\]{font-family:IBM Plex sans}.focus\:text-white:focus{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.focus\:\[outline\:3px_solid_var\(--muidocs-palette-primary-200\)\]:focus{outline:3px solid var(--muidocs-palette-primary-200)}" />
          <TabsUnstyled selectionFollowsFocus defaultValue={0}>
            <TabsListUnstyled className="mb-[16px] flex min-w-[300px] content-between items-center justify-center rounded-[12px] bg-[--muidocs-palette-primary-main] [box-shadow:var(--muidocs-shadows-2)]">
              <TabUnstyled
                className="m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white [font-family:IBM_Plex_sans] focus:text-white focus:[outline:3px_solid_var(--muidocs-palette-primary-200)]"
                slotProps={{
                  root: ({ selected }) => ({
                    className: clsx(selected && '!bg-white !text-[--muidocs-palette-primary-main]'),
                  }),
                }}
              >
                One
              </TabUnstyled>
              <TabUnstyled
                className="m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white [font-family:IBM_Plex_sans] focus:text-white focus:[outline:3px_solid_var(--muidocs-palette-primary-200)]"
                slotProps={{
                  root: ({ selected }) => ({
                    className: clsx(selected && '!bg-white !text-[--muidocs-palette-primary-main]'),
                  }),
                }}
              >
                Two
              </TabUnstyled>
              <TabUnstyled
                className="m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white [font-family:IBM_Plex_sans] focus:text-white focus:[outline:3px_solid_var(--muidocs-palette-primary-200)]"
                slotProps={{
                  root: ({ selected }) => ({
                    className: clsx(selected && '!bg-white !text-[--muidocs-palette-primary-main]'),
                  }),
                }}
              >
                Three
              </TabUnstyled>
            </TabsListUnstyled>
            <TabPanelUnstyled className="[font-family:IBM_Plex_sans] text-[0.875rem]" value={0}>
              First page
            </TabPanelUnstyled>
            <TabPanelUnstyled className="[font-family:IBM_Plex_sans] text-[0.875rem]" value={1}>
              Second page
            </TabPanelUnstyled>
            <TabPanelUnstyled className="[font-family:IBM_Plex_sans] text-[0.875rem]" value={2}>
              Third page
            </TabPanelUnstyled>
          </TabsUnstyled>
        </React.Fragment>
      ) : (
        <TabsUnstyled selectionFollowsFocus defaultValue={0}>
          <TabsListUnstyled slots={{ root: styling !== 'system' ? undefined : StyledTabsList }}>
            <TabUnstyled slots={{ root: styling !== 'system' ? undefined : StyledTab }}>
              One
            </TabUnstyled>
            <TabUnstyled slots={{ root: styling !== 'system' ? undefined : StyledTab }}>
              Two
            </TabUnstyled>
            <TabUnstyled slots={{ root: styling !== 'system' ? undefined : StyledTab }}>
              Three
            </TabUnstyled>
          </TabsListUnstyled>
          <TabPanelUnstyled
            slots={{ root: styling !== 'system' ? undefined : StyledTabPanel }}
            value={0}
          >
            First page
          </TabPanelUnstyled>
          <TabPanelUnstyled
            slots={{ root: styling !== 'system' ? undefined : StyledTabPanel }}
            value={1}
          >
            Second page
          </TabPanelUnstyled>
          <TabPanelUnstyled
            slots={{ root: styling !== 'system' ? undefined : StyledTabPanel }}
            value={2}
          >
            Third page
          </TabPanelUnstyled>
        </TabsUnstyled>
      )}
    </Box>
  );
}
BaseTabsDemo.getCode = (styling: 'system' | 'tailwindcss' | 'css') => {
  if (styling === 'system') {
    return `import TabsUnstyled from '@mui/base/Tabs';
import TabsListUnstyled from '@mui/base/TabsList';
import TabPanelUnstyled from '@mui/base/TabPanel';
import TabUnstyled from '@mui/base/Tab';
import { styled } from '@mui/system';

const StyledTabsList = styled('div')\`/* CSS… */\`;
const StyledTabPanel = styled('div')\`/* CSS… */\`;
const StyledTab = styled('button')\`/* CSS… */\`;

<TabsUnstyled selectionFollowsFocus defaultValue={0}>
  <TabsListUnstyled slots={{ root: StyledTabsList }}>
    <TabUnstyled slots={{ root: StyledTab }}>One</TabUnstyled>
    <TabUnstyled slots={{ root: StyledTab }}>Two</TabUnstyled>
    <TabUnstyled slots={{ root: StyledTab }}>Three</TabUnstyled>
  </TabsListUnstyled>
  <TabPanelUnstyled slots={{ root: StyledTabPanel }} value={0}>
    First page
  </TabPanelUnstyled>
  <TabPanelUnstyled slots={{ root: StyledTabPanel }} value={1}>
    Second page
  </TabPanelUnstyled>
  <TabPanelUnstyled slots={{ root: StyledTabPanel }} value={2}>
    Third page
  </TabPanelUnstyled>
</TabsUnstyled>
`;
  }
  if (styling === 'tailwindcss') {
    return `import TabsUnstyled from '@mui/base/Tabs';
import TabsListUnstyled from '@mui/base/TabsList';
import TabPanelUnstyled from '@mui/base/TabPanel';
import TabUnstyled from '@mui/base/Tab';

<TabsUnstyled selectionFollowsFocus defaultValue={0}>
  <TabsListUnstyled className="mb-[16px] flex min-w-[300px] content-between items-center justify-center rounded-[12px] bg-[--muidocs-palette-primary-main] [box-shadow:var(--muidocs-shadows-2)]">
    <TabUnstyled
      className="m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white focus:text-white focus:[outline:3px_solid_var(--muidocs-palette-primary-200)]"
      slotProps={{
        root: ({ selected }) => ({
          className: clsx(selected && '!bg-white !text-[--muidocs-palette-primary-main]'),
        }),
      }}
    >
      One
    </TabUnstyled>
    <TabUnstyled
      className="m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white focus:text-white focus:[outline:3px_solid_var(--muidocs-palette-primary-200)]"
      slotProps={{
        root: ({ selected }) => ({
          className: clsx(selected && '!bg-white !text-[--muidocs-palette-primary-main]'),
        }),
      }}
    >
      Two
    </TabUnstyled>
    <TabUnstyled
      className="m-[6px] flex w-full cursor-pointer justify-center rounded-[7px] border-none bg-transparent p-[12px] text-[0.875rem] font-bold text-white focus:text-white focus:[outline:3px_solid_var(--muidocs-palette-primary-200)]"
      slotProps={{
        root: ({ selected }) => ({
          className: clsx(selected && '!bg-white !text-[--muidocs-palette-primary-main]'),
        }),
      }}
    >
      Three
    </TabUnstyled>
  </TabsListUnstyled>
  <TabPanelUnstyled value={0}>First page</TabPanelUnstyled>
  <TabPanelUnstyled value={1}>Second page</TabPanelUnstyled>
  <TabPanelUnstyled value={2}>Third page</TabPanelUnstyled>
</TabsUnstyled>`;
  }
  if (styling === 'css') {
    return `import TabsUnstyled from '@mui/base/Tabs';
import TabsListUnstyled from '@mui/base/TabsList';
import TabPanelUnstyled from '@mui/base/TabPanel';
import TabUnstyled from '@mui/base/Tab';
import { styled } from '@mui/system';
import './styles.css';

<TabsUnstyled selectionFollowsFocus defaultValue={0}>
  <TabsListUnstyled>
    <TabUnstyled>One</TabUnstyled>
    <TabUnstyled>Two</TabUnstyled>
    <TabUnstyled>Three</TabUnstyled>
  </TabsListUnstyled>
  <TabPanelUnstyled value={0}>
    First page
  </TabPanelUnstyled>
  <TabPanelUnstyled value={1}>
    Second page
  </TabPanelUnstyled>
  <TabPanelUnstyled value={2}>
    Third page
  </TabPanelUnstyled>
</TabsUnstyled>
    `;
  }
  return '';
};
