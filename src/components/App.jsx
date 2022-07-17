import React, { useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { getUsers } from '../api/api';
import Agenda from './agenda/Agenda';
import Contact from './contact/Contact';
import Page from './page/Page';


export default function App() {

    useEffect(() => {
        getUsers();
    })

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Page><Agenda /></Page>} />
                <Route path="agenda" element={<Page><Agenda /></Page>} />
                <Route path="contact" element={<Page><Contact /></Page>} />
            </Routes>
        </BrowserRouter>
    )
}