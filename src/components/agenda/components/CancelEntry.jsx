import React from 'react';
import { useDispatch } from 'react-redux';
import { removeEntry, setEdited } from "../agendaSlice";

export default function CancelEntry({ entryId, isNew }) {
    const dispatch = useDispatch();

    const onClick = () => {
        if (isNew) {
            dispatch(removeEntry(entryId));
        } else {
            dispatch(setEdited({ entryId, isEdited: false }))
        }
    }

    return <button className="cancel-entry" onClick={onClick}>cancel</button>
}