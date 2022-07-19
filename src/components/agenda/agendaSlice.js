import { createSlice } from '@reduxjs/toolkit'

const compare = (a, b) => {
    if (a.startDate < b.startDate) {
        return -1;
    }
    if (a.startDate > b.startDate) {
        return 1;
    }
    return 0;
}

export const agendaSlice = createSlice({
    name: 'agenda',
    initialState: {
        entries: [],
        id: '',
        day: 0,
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
            state.entries = state.entries.filter(entry => entry.id !== payload)
        },
        setEdited: (state, { payload }) => {
            const { entryId, isEdited } = payload;
            state.entries = state.entries.map(entry => {
                if (entry.id === entryId) {
                    entry.isEdited = isEdited;
                }
                return entry;
            })
        },
        setEntrySaved: (state, { payload }) => {
            const { entryId, form } = payload;
            const index = state.entries.findIndex(entry => entry.id === entryId);
            state.entries[index].editable = true;
            state.entries[index].isNew = undefined;
            state.entries[index].isEdited = false;

            Object.keys(form).forEach((key) => {
                state.entries[index][key] = form[key];
            })
            state.entries.sort(compare);
        }
    }
})

export const { setAgenda, addEntry, removeEntry, setEntries, setEntrySaved, setEdited } = agendaSlice.actions

export default agendaSlice.reducer