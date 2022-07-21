import React, { useEffect, useRef, useState } from 'react';
import SaveEntry from './SaveEntry';
import CancelEntry from './CancelEntry';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getEntries, getFirstEntry, getLastEntry } from '../agendaSelectors';
import { useTranslation } from 'react-i18next';

import './AgendaEntry.scss';

/**
 * Component used to edit agenda row
 * @param {{index: number, entry: Object, isNew: boolean}} props
 *      1. index is the index of the row, shown in the square
 *      2. entry - contains row's data - startDate, name and description
 * @returns {ReactElement}
 */
export default function AgendaEntryEdit ({ index, entry }) {
  const hourFormat = process.env.TIME_FORMAT;
  const hourStep = parseInt(process.env.HOUR_STEP);
  const minutesStep = parseInt(process.env.MINUTE_STEP);
  const { id, startDate: originalStartDate, name: originalName, description: originalDescription, isPlanned, isNew } = entry;

  const { t } = useTranslation();

  const entries = useSelector(getEntries);
  const startingEntry = useSelector(getFirstEntry);
  const endingEntry = useSelector(getLastEntry);

  const [startDate, setStartDate] = useState(isPlanned ? moment(originalStartDate) : undefined);
  const [name, setName] = useState(originalName);
  const [description, setDescription] = useState(originalDescription);
  const [isDisabled, setIsDisabled] = useState(false);

  const newEntryRef = useRef(null);
  const requiredFields = [startDate, name];

  useEffect(() => {
    scrollToNewEntry();
  }, []);

  useEffect(() => {
    setSaveDisabled();
  }, [startDate, name, description]);

  function scrollToNewEntry () {
    if (isNew) {
      newEntryRef?.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  function setSaveDisabled () {
    const isSaveDisabled = requiredFields.some(field => [undefined, null, ''].some(nullish => field === nullish));
    setIsDisabled(isSaveDisabled);
  }

  const onStartDateChange = (target) => {
    const format = 'YYYY-MM-DD';
    const sameDay = moment(target?.format(format)).isSame(moment(originalStartDate).format(format));

    if (target !== null) {
      if (sameDay) {
        setStartDate(target);
      } else {
        const startDate = moment(originalStartDate);
        const date = target.year(startDate.year()).month(startDate.month()).date(startDate.date());
        setStartDate(date);
      }
    } else {
      setStartDate(undefined);
    }
  };

  const onNameChange = ({ target }) => {
    setName(target?.value);
  };

  const onDescriptionChange = ({ target }) => {
    setDescription(target?.value);
  };

  const getDisabledHours = () => {
    const startHour = moment(startingEntry.startDate).hour();
    const startHourArray = Array(startHour).fill(0).map((value, index) => index);

    const endHour = moment(endingEntry.startDate).hour();
    const endHourArray = Array(24 - endHour).fill(0).map((value, index) => endHour + index + 1);

    return [...startHourArray, ...endHourArray];
  };

  const getDisableMinutes = (hour) => {
    const startHour = moment(startingEntry.startDate).hour();
    const startMins = moment(startingEntry.startDate).minute();

    const endHour = moment(endingEntry.startDate).hour();
    const endMins = moment(endingEntry.startDate).minute();

    const existingStartTimes = entries.map(entry => entry.startDate);
    let disabledMinutes = [];
    const existingTimeEntries = existingStartTimes.map(time => {
      const hour = moment(time).hour();
      const min = moment(time).minute();

      return { hour, min };
    });
    const doesHourExist = existingTimeEntries.find(time => time.hour === hour);

    if (hour === startHour) {
      const array = Array(startMins / minutesStep + 1).fill(0).map((value, index) => index * minutesStep);
      disabledMinutes = array;
    } else if (hour === endHour) {
      const array = Array((60 - endMins) / minutesStep).fill(0).map((value, index) => index * minutesStep + endMins);
      disabledMinutes = array;
    }

    if (doesHourExist) {
      existingTimeEntries.filter(time => time.hour === hour).forEach(time => {
        disabledMinutes.push(time.min);
      });
    }
    return disabledMinutes;
  };

  return <div className={'agenda-entry agenda-entry-edit'} ref={newEntryRef} data-cy="agenda-edit-entry">
        <div className="index">{index}</div>

        <TimePicker
            className="start-date"
            showSecond={false}
            value={startDate}
            onChange={onStartDateChange}
            format={hourFormat}
            allowEmpty={true}
            disabledHours={getDisabledHours}
            disabledMinutes={getDisableMinutes}
            hourStep={hourStep}
            minuteStep={minutesStep}
            data-cy="timepicker"
        />
        <div className="texts-edit">
            <input className="name" value={name} onChange={onNameChange} placeholder={t('entry.placeholders.name')} data-cy="edit-name" />
            <textarea className="description" value={description} onChange={onDescriptionChange} placeholder={t('entry.placeholders.description')} data-cy="edit-description" />
        </div>

        <div className="actions">
            <SaveEntry entryId={id} entry={{ name, description, startDate }} isDisabled={isDisabled} />
            <CancelEntry entryId={id} isNew={isNew} />
        </div>
    </div>;
}
