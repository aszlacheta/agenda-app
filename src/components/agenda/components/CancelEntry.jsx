import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { removeEntry, setNonEditMode } from '../agendaSlice';

/**
 * Component used to render cancel button in edit agenda entry
 * @param {{entryId: string, isNew: boolean}} props
 *      1. entryid - id of the edited entry
 *      2. isNew - true if entry was newly added, false otherwise
 * @returns {ReactElement}
 */
export default function CancelEntry ({ entryId, isNew }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onClick = () => {
    if (isNew) {
      dispatch(removeEntry(entryId));
    } else {
      dispatch(setNonEditMode(entryId));
    }
  };

  return <button className="cancel-entry" onClick={onClick} data-cy="cancel-button">{t('entry.buttons.cancel')}</button>;
}
