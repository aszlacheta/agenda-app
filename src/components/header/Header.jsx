import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export default function Header() {
    const { t } = useTranslation();
    const setClassName = ({isActive}) => (isActive ? 'active' : 'inactive')

    return <nav className="header">
        <NavLink to="/agenda" className={setClassName}>{t('menu.Agenda')}</NavLink>
        <NavLink to="/contact" className={setClassName}>{t('menu.Contact')}</NavLink>
    </nav>
}