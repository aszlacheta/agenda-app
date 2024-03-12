import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addAgendaEntry } from '../../../api/api';
import { getAgendaId } from '../agendaSelectors';
import { saveEntry } from '../agendaSlice';

/**
 * Component used to save entry in edit mode
 * @param {{entryId: string, entry: Object, isDisabled: boolean}} props
 *      1.  entryId - id of the string
 *      2. entry - data of the entry that has to be saved
 *      3. isDisabled - true if button should be disabled; false otherwise
 * @returns {ReactElement}
 */
export default function SaveEntry ({ entryId, entry, isDisabled = false }) {
  const agendaId = useSelector(getAgendaId);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onClick = () => {
    entry.startDate = entry?.startDate.valueOf();

    addAgendaEntry(agendaId, entry)
      .then(() => {
        dispatch(saveEntry({ entryId, entry }));
      });
  };

  return <button className="save-entry" onClick={onClick} disabled={isDisabled} data-cy="save-button">{t('entry.buttons.save')}</button>;
}
