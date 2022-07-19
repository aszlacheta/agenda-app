import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.scss';

export default function Footer() {
    const year = new Date().getFullYear();
    const { t } = useTranslation();


    return <div className="footer" data-cy="footer"><span>{t('footer.label', {year})}</span></div>
}