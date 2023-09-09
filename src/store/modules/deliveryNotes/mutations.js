export const startPageLoad = state => (state.pageLoad = true);

export const endPageLoad = state => (state.pageLoad = false);

export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, errors) => (state.errors = errors);

export const setLoading = (state, trueOrFalse) => (state.loading = trueOrFalse);

export const setNotesList = (state, notes) => (state.notes = notes);

export const setRemainingItems = (state, items) => (state.remainingItems = items);

export const removeDeliveryNote = (state, id) => {
	state.notes = state.notes.filter(note => note.id !== id);
};

export const getSelectedNote = (state, comingId) => {
	const id = parseInt(comingId);
	state.selectedDeliveryNote = state.notes.find(note => note.id === id);
};

export const getNoteToUpdate = (state, comingId) => {
	const id = parseInt(comingId);
	state.updateDeliveryNote = state.notes.find(note => note.id === id);
};
