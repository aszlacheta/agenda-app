import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAgenda } from '../../api/api';
import { getEntries, isEntryEditedNow } from './agendaSelectors';
import { setAgenda } from './agendaSlice';
import AddEntry from './components/AddEntry';
import AgendaEntry from './components/AgendaEntry';
import AgendaEntryEdit from './components/AgendaEntryEdit';
import './Agenda.scss';

export const getRandomInt = (min = 0, max = 10000) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export default function Agenda({ agendaId }) {

    const entries = useSelector(getEntries)
    const areEntriesEditedNow = useSelector(isEntryEditedNow)
    const dispatch = useDispatch();

    useEffect(() => {
        const hasEntries = entries.length > 0;

        if (!hasEntries) {
            getAgenda(agendaId)
                .then(({ data }) => {
                    dispatch(setAgenda(data))
                })
        }
    }, []);

    return <div className="agenda">
        <div className="agenda-container">
            {entries.map((entry, index) => entry.isEdited ?
                    <AgendaEntryEdit
                        key={index}
                        index={index + 1}
                        agendaId={agendaId}
                        isNew={entry.isNew}
                        entry={entry}
                        editable={entry.editable}
                        deletable={entry.deletable}
                    /> :
                    <AgendaEntry
                        key={index}
                        index={index + 1}
                        agendaId={agendaId}
                        isNew={entry.isNew}
                        entry={entry}
                        editable={entry.editable}
                        deletable={entry.deletable}
                    />
            )}
        </div>
        <AddEntry disabled={areEntriesEditedNow} />
    </div>
}