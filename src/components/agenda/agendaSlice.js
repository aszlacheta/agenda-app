import { createSlice } from '@reduxjs/toolkit';

const compareEntry = (a, b) => {
  if (a.startDate < b.startDate) {
    return -1;
  }
  if (a.startDate > b.startDate) {
    return 1;
  }
  return 0;
};

export const agendaSlice = createSlice({
  name: 'agenda',
  initialState: {
    entries: [],
    id: '',
    day: 0
  },
  reducers: {
    setAgenda: (state, { payload }) => {
      const { id, day, entries } = payload;
      state.id = id;
      state.day = day;
      state.entries = entries;
    },
    setEntries: (state, { payload }) => {
      state.entries = payload;
    },
    addEntry: (state, { payload }) => {
      payload.isEdited = true;
      state.entries.push(payload);
    },
    removeEntry: (state, { payload }) => {
      state.entries = state.entries.filter(entry => entry.id !== payload);
    },
    setEditMode: (state, { payload: entryId }) => {
      state.entries = state.entries.map(entry => {
        if (entry.id === entryId) {
          entry.isEdited = true;
        }
        return entry;
      });
    },
    setNonEditMode: (state, { payload: entryId }) => {
      state.entries = state.entries.map(entry => {
        if (entry.id === entryId) {
          entry.isEdited = false;
        }
        return entry;
      });
    },
    saveEntry: (state, { payload }) => {
      const { entryId, entry } = payload;
      const index = state.entries.findIndex(entry => entry.id === entryId);

      Object.keys(entry).forEach((key) => {
        state.entries[index][key] = entry[key];
      });

      state.entries[index].editable = true;
      state.entries[index].isNew = undefined;
      state.entries[index].isEdited = false;

      state.entries.sort(compareEntry);
    }
  }
});

export const { setAgenda, addEntry, removeEntry, setEntries, saveEntry, setEditMode, setNonEditMode } = agendaSlice.actions;

export default agendaSlice.reducer;
