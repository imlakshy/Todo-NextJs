import "./globals.css";
import { Jost } from 'next/font/google';
import React from 'react';
import { NextUIProvider } from '@nextui-org/react';

const jost_init = Jost({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-jost',
});

export const metadata = {
  title: "Simple Todo",
  description: "Your Daily Task Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextUIProvider>
        <body className={jost_init.variable}>{children}</body>
      </NextUIProvider>
    </html>
  );
}
