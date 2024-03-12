import React from 'react';
import DeleteButton from './DeleteEntry';
import './AgendaEntry.scss';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setEditMode } from '../agendaSlice';

/**
 * Component used to render agenda entry (row)
 * @param {{index: number, agendaId: string, editable: boolean, deletable: boolean}} props
 *          1. index - index of the row
 *          2. agendaId - id of agenda
 *          3. entry - data of the agenda row
 * @returns {ReactElement}
 */
export default function AgendaEntry ({ index, agendaId, entry }) {
  const hourFormat = process.env.TIME_FORMAT;
  const { id, startDate, name, description, editable, deletable } = entry;

  const dispatch = useDispatch();

  const onEdit = () => {
    if (editable) {
      dispatch(setEditMode(id));
    }
  };

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
    </div>;
}
