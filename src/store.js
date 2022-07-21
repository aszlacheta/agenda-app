import { configureStore } from '@reduxjs/toolkit';
import agendaReducer from './components/agenda/agendaSlice';

export default configureStore({
  reducer: {
    agenda: agendaReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});
