import * as React from 'react';
import type { Metadata } from 'next';
import '@pigment-css/react/styles.css';
import { css } from '@pigment-css/react';

import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={css(({ theme }) => ({
          color: 'hsl(var(--palette-foreground))',
          backgroundColor: 'hsl(var(--palette-background))',
          fontFamily:
            "system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
          ...theme.applyStyles('dark', {
            colorScheme: 'dark',
          }),
        }))}
      >
        {props.children}
      </body>
    </html>
  );
}
