import React, { useState } from 'react';
import DeleteButton from './DeleteEntry';
import './AgendaEntry.scss'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setEdited } from '../agendaSlice';

export default function AgendaEntry({ index, agendaId, entry, editable, deletable, isNew, hourStep, minuteStep }) {

    const hourFormat = 'HH:mm';
    const { id, startDate, name, description } = entry;
    const dispatch = useDispatch();

    const onEdit = () => {
        if (editable) {
            dispatch(setEdited({entryId: id, isEdited: true }));
        }
    }

    return <div className={`agenda-entry ${editable ? 'editable' : ''}`} onClick={onEdit} data-cy="agenda-entry">
        <div className="index">{index}</div>
        <div className="start-date">{moment(startDate).format(hourFormat)}</div>

        <div>
            <div className="name">{name}</div>
            <div className="description">{description}</div>
        </div>

        <div className="actions">
            {deletable && <DeleteButton agendaId={agendaId} entryId={id} />}
        </div>
    </div>
}