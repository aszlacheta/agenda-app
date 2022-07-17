import React from 'react';
import './Footer.scss';

export default function Footer() {
    const year = new Date().getFullYear();

    return <div className="footer"><span>All rights reserved @ {year}</span></div>
}