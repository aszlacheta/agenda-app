import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import useRandomId from '../hooks/useRandomId';
import Agenda from './agenda/Agenda';
import Contact from './contact/Contact';
import Page from './page/Page';

export default function App () {
  return (
        <BrowserRouter>
            <Routes>
                <Route path="agenda" element={<Page><Agenda agendaId={useRandomId()} /></Page>} />
                <Route path="contact" element={<Page><Contact /></Page>} />
                <Route path="*" element={<Page><Agenda agendaId={useRandomId()} /></Page>} />
            </Routes>
        </BrowserRouter>
  );
}
