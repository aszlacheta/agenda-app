import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import './Page.scss';

export default function Page({ children }) {

    return <>
        <Header />
        <div className="page-children-container">
            {children}
        </div>
        <Footer />
    </>
}
