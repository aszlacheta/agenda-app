const getEntries = state => state.agenda.entries;
const isEntryEditedNow = state => state.agenda.entries.some(entry => entry.isEdited === true);
const getAgendaId = state => state.agenda.id;
const getAgendaDay = state => state.agenda.day;
const getEditableDeletableEntries = state => state.agenda.entries.filter(entry => entry.deletable === true);
const getFirstEntry = state => state.agenda.entries.find(entry => [entry.editable, entry.deletable].every(bool => bool === false));
const getLastEntry = state => state.agenda.entries.findLast(entry => [entry.editable, entry.deletable].every(bool => bool === false));

export {
    getEntries,
    isEntryEditedNow,
    getAgendaId,
    getAgendaDay,
    getFirstEntry,
    getLastEntry,
    getEditableDeletableEntries,
}