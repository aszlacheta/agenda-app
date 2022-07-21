import React from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.scss';

export default function Contact () {
  const { t } = useTranslation();
  return <div className="contact">{t('contact.notImplemented')}</div>;
}
