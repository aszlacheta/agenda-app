import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAgendaEntry } from '../../../api/api';
import { removeEntry } from '../agendaSlice';

/**
 * Component used to render delete button for single agenda entry
 * @param {{agendaId: string, entryId: string}} props React props used to define:
 *          1) agendaId - id of the agenda
 *          2) entryId - id of agenda entry 
 * @returns {ReactElement} component
 */
export default function DeleteButton({ agendaId, entryId }) {
    const dispatch = useDispatch();

    const onClick = () => {
        deleteAgendaEntry(agendaId, entryId)
            .then(() => {
                dispatch(removeEntry(entryId));
            });
    }

    return <button onClick={onClick}>x</button>
}