import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { addAgendaEntry } from '../../../api/api';
import { getAgendaId } from '../agendaSelectors';
import { setEntrySaved } from '../agendaSlice';

export default function SaveEntry({ entryId, form }) {
    const agendaId = useSelector(getAgendaId);
    const dispatch = useDispatch();

    const onClick = () => {
        form.startDate = form.startDate.valueOf();

        addAgendaEntry(agendaId, form)
            .then(() => {
                dispatch(setEntrySaved({ entryId, form }));
            });
    }

    return <button className="save-entry" onClick={onClick}>save</button>
}