import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Agenda, { getRandomInt } from './agenda/Agenda';
import Contact from './contact/Contact';
import Page from './page/Page';


export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Page><Agenda agendaId={getRandomInt()} /></Page>} />
                <Route path="agenda" element={<Page><Agenda agendaId={getRandomInt()} /></Page>} />
                <Route path="contact" element={<Page><Contact /></Page>} />
            </Routes>
        </BrowserRouter>
    )
}