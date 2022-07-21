const getEntries = state => state.agenda.entries
const isEntryEditedNow = state => state.agenda.entries.some(entry => entry.isEdited === true)
const getAgendaId = state => state.agenda.id
const getAgendaDay = state => state.agenda.day
const getEditableDeletableEntries = state => state.agenda.entries.filter(entry => [entry.editable, entry.deletable].every(bool => bool === true))
const getNonEditableDeletableEntries = state => state.agenda.entries.filter(entry => [entry.editable, entry.deletable].every(bool => bool === false))
const getFirstEntry = state => getNonEditableDeletableEntries(state)?.at(0)
const getLastEntry = state => getNonEditableDeletableEntries(state)?.at(-1)

export {
  getEntries,
  isEntryEditedNow,
  getAgendaId,
  getAgendaDay,
  getFirstEntry,
  getLastEntry,
  getEditableDeletableEntries
}
