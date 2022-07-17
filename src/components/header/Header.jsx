import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export default function Header() {

    const setClassName = ({isActive}) => (isActive ? 'active' : 'inactive')

    return <nav className="header">
        <NavLink to="/agenda" className={setClassName}>Agenda</NavLink>
        <NavLink to="/contact" className={setClassName}>Contact</NavLink>
    </nav>
}