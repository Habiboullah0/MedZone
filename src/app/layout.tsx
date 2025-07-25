"use client";

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n'; // Adjust path if necessary
import './globals.css'; // Assuming global styles are here
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nextProvider i18n={i18n}>
          {children}
        </I18nextProvider>
      </body>
    </html>
  );
}

