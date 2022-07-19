import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAgendaEntry } from '../../../api/api';
import { getRandomInt } from '../Agenda';
import { getAgendaDay, getEditableDeletableEntries, getEntries, getFirstEntry, getLastEntry } from '../agendaSelectors';
import { addEntry } from '../agendaSlice';
import './AddEntry.scss';

/**
 * Component used to add new entry to agenda
 * @param {*} param0 
 * @returns 
 */
export default function AddEntry({ disabled }) {

    const dispatch = useDispatch();
    const agendaDay = useSelector(getAgendaDay);
    const entries = useSelector(getEditableDeletableEntries);
    const endingEntry = useSelector(getLastEntry);
    const startingEntry = useSelector(getFirstEntry);

    const onClick = () => {
        const lastSet = entries.at(-1) || startingEntry;
        const lastSetTime = moment(lastSet.startDate);
        const mins = proposeTime(lastSet);
        let startDate = moment(agendaDay).hour(lastSetTime.hour()).minute(lastSetTime.minute());
        startDate.add(mins, 'm');
        const newEntry = {
            id: getRandomInt(),
            startDate: startDate?.valueOf(),
            name: 'Test',
            description: '',
            editable: true,
            deletable: true,
            isNew: true,
            isPlanned: !!mins
        }
        dispatch(addEntry(newEntry));
    }

    const proposeTime = (lastSet) => {
        const difference = moment.duration(endingEntry?.startDate - lastSet?.startDate);
        const differenceMins = difference.asMinutes();

        if (differenceMins > 60) {
            return 60;
        } else if (differenceMins > 30) {
            return 30;
        } else if (differenceMins > 15) {
            return 15;
        } else if (differenceMins > 10) {
            return 10;
        } else if (differenceMins > 5) {
            return 5;
        } else {
            return undefined;
        }

    }

    return <button className="add-entry" onClick={onClick} disabled={disabled} data-cy="add-entry">+</button>
}