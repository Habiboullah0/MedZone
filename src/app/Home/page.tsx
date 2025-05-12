"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation('common'); // Ensure 'common' is your namespace

  return (
    <div>
      <h1>{t('home')}</h1>
      <p>{t('welcome')}</p>
      <p>{t('medzone_description')}</p>
      {/* Add more translated content or components here */}
    </div>
  );
};

export default HomePage;

