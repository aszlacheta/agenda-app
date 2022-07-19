import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import './Page.scss';

export default function Page({ children }) {

    return <>
        <Header />
        <div className="page-children-container" data-cy="page">
            {children}
        </div>
        <Footer />
    </>
}
