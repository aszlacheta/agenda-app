import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAgenda } from '../../api/api';
import { getEntries, isEntryEditedNow } from './agendaSelectors';
import { setAgenda } from './agendaSlice';
import AddEntry from './components/AddEntry';
import AgendaEntry from './components/AgendaEntry';
import AgendaEntryEdit from './components/AgendaEntryEdit';
import './Agenda.scss';

/**
 * Component used to render agenda with its entries (rows)
 * @param {{agendaId: string}} props agendaId - id of the agenda
 * @returns {ReactElement} component
 */
export default function Agenda ({ agendaId }) {
  const entries = useSelector(getEntries);
  const areEntriesEditedNow = useSelector(isEntryEditedNow);
  const dispatch = useDispatch();

  useEffect(() => {
    loadEntries();
  }, []);

  function loadEntries () {
    const hasEntries = entries.length > 0;

    if (!hasEntries) {
      getAgenda(agendaId)
        .then(({ data }) => {
          dispatch(setAgenda(data));
        });
    }
  }

  return <div className="agenda">
        <div className="agenda-container">
            {entries.map((entry, index) => entry.isEdited
              ? <AgendaEntryEdit
                    key={index}
                    index={index + 1}
                    entry={entry}
                />
              : <AgendaEntry
                    key={index}
                    index={index + 1}
                    agendaId={agendaId}
                    entry={entry}
                />
            )}
        </div>
        <AddEntry isDisabled={areEntriesEditedNow} />
    </div>;
}
