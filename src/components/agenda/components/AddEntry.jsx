import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import useProposedTime from '../../../hooks/useProposedTime';
import useRandomId from '../../../hooks/useRandomId';
import { getAgendaDay, getEditableDeletableEntries, getFirstEntry, getLastEntry } from '../agendaSelectors';
import { addEntry } from '../agendaSlice';
import './AddEntry.scss';

/**
 * Component used to add new entry to agenda
 * @param {{isDisabled: boolean}} props isDisabled determines if component should be disabled or not
 * @returns {ReactElement}
 */
export default function AddEntry ({ isDisabled }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const agendaDay = useSelector(getAgendaDay);
  const entries = useSelector(getEditableDeletableEntries);
  const endingEntry = useSelector(getLastEntry);
  const startingEntry = useSelector(getFirstEntry);

  /**
     * Handler invoked on adding new entry
     */
  const onAdd = () => {
    const lastSetEntry = entries.at(-1) || startingEntry;
    const lastSetTime = moment(lastSetEntry.startDate);
    const propopsedMins = useProposedTime(lastSetEntry, endingEntry);

    const newStartDate = moment(agendaDay).hour(lastSetTime.hour()).minute(lastSetTime.minute());
    newStartDate.add(propopsedMins, 'm');

    const newEntry = {
      id: useRandomId(),
      startDate: newStartDate?.valueOf(),
      name: '',
      description: '',
      editable: true,
      deletable: true,
      isNew: true,
      isPlanned: !!propopsedMins
    };
    dispatch(addEntry(newEntry));
  };

  return <button className="add-entry" onClick={onAdd} disabled={isDisabled} data-cy="add-entry">{t('agenda.buttons.add')}</button>;
}
