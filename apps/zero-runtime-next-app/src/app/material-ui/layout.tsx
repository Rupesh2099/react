import * as React from 'react';
import { styled } from '@mui/zero-runtime';

const Main = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  marginInline: 'auto',
  maxWidth: '900px',
  paddingBlock: '16px',
  paddingInline: '8px',
  [theme.breakpoints.up('sm')]: {
    paddingInline: '24px',
  },
  [theme.breakpoints.up('lg')]: {
    paddingInline: '60px',
  },
  '& h1': {
    marginTop: 0,
    marginBottom: 0,
  },
  '& h2': {
    marginTop: 0,
    marginBottom: '0.75em',
  },
  '& .demo-container': {
    position: 'relative',
    margin: 'auto',
    display: 'flex',
    WebkitBoxPack: 'center',
    justifyContent: 'center',
    padding: '24px',
    backgroundColor: 'rgb(255, 255, 255)',
    borderWidth: '1px 0px',
    borderStyle: 'solid',
    borderColor: 'rgb(229, 234, 242)',
    borderImage: 'initial',
    borderRadius: '12px',
    borderLeftWidth: '1px',
    borderRightWidth: '1px',
  },
}));

export default function MaterialUILayout({ children }: { children: React.ReactNode }) {
  return <Main>{children}</Main>;
}
