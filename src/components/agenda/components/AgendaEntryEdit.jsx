import React, { useEffect, useRef, useState } from 'react';
import SaveEntry from './SaveEntry';
import CancelEntry from './CancelEntry';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getEntries, getFirstEntry, getLastEntry } from '../agendaSelectors';

import './AgendaEntry.scss';

export default function AgendaEntryEdit({ index, agendaId, entry, editable, deletable, isNew, hourStep, minuteStep }) {

    const entries = useSelector(getEntries);
    const startingEntry = useSelector(getFirstEntry);
    const endingEntry = useSelector(getLastEntry);
    const hourFormat = 'HH:mm';
    const { id, startDate: originalStartDate, name: originalName, description: originalDescription, isPlanned } = entry;
    const [startDate, setStartDate] = useState(isPlanned ? moment(originalStartDate) : undefined);
    const [name, setName] = useState(originalName);
    const [description, setDescription] = useState(originalDescription);
    const myRef = useRef(null)

    useEffect(() => {
        if (isNew) {
            myRef?.current.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, [])


    const onStartDateChange = (target) => {
        const format = 'YYYY-MM-DD'
        const sameDay = moment(target.format(format)).isSame(moment(originalStartDate).format(format))

        if (sameDay) {
            setStartDate(target);
        } else {
            const a = moment(originalStartDate);
            const date = target.year(a.year()).month(a.month()).date(a.date());
            setStartDate(date);
        }
    }

    const onNameChange = ({ target }) => {
        setName(target?.value);
    }

    const onDescriptionChange = ({ target }) => {
        setDescription(target?.value);
    }

    const disabledHours = () => {
        const startHour = moment(startingEntry.startDate).hour();
        const startHourArray = Array(startHour).fill(0).map((value, index) => index);

        const endHour = moment(endingEntry.startDate).hour();
        const endHourArray = Array(24 - endHour).fill(0).map((value, index) => endHour + index + 1);

        return [...startHourArray, ...endHourArray];
    }

    const disableMinutes = (h) => {
        const startHour = moment(startingEntry.startDate).hour();
        const startMins = moment(startingEntry.startDate).minute();

        const endHour = moment(endingEntry.startDate).hour();
        const endMins = moment(endingEntry.startDate).minute();

        const existingStartTimes = entries.map(entry => entry.startDate);

        const existing = existingStartTimes.map(time => {
            const hour = moment(time).hour();
            const min = moment(time).minute();

            return { hour, min }
        })

        let ret = [];

        if (h === startHour) {
            const array = Array(startMins / 5 + 1).fill(0).map((value, index) => index * 5);
            ret = array;
        } else if (h === endHour) {
            const array = Array((60 - endMins) / 5).fill(0).map((value, index) => index * 5 + endMins);
            ret = array;
        }

        const exist = existing.find(time => time.hour === h);
        if (exist) {
            existing.filter(time => time.hour === h).forEach(time => {
                ret.push(time.min);
            })
        }
        return ret;
    }

    return <div className={`agenda-entry agenda-entry-edit`} ref={myRef}>
        <div className="index">{index}</div>

        {editable && <TimePicker
            showSecond={false}
            value={startDate}
            className="start-date"
            onChange={onStartDateChange}
            format={hourFormat}
            allowEmpty={false}
            disabledHours={disabledHours}
            disabledMinutes={disableMinutes}
            hourStep={parseInt(process.env.HOUR_STEP)}
            minuteStep={parseInt(process.env.MINUTE_STEP)}
        />}
        {editable && <div className="texts-edit">
            <input className="name" value={name} onChange={onNameChange} placeholder={"Set name..."} />
            <textarea className="description" value={description} onChange={onDescriptionChange} placeholder={"Set description..."} />
        </div>}

        <div className="actions">
            <SaveEntry entryId={id} form={{ name, description, startDate }} />
            <CancelEntry entryId={id} isNew={isNew} />
        </div>
    </div>
}