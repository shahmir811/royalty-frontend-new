export const startPageLoad = state => (state.pageLoad = true);

export const endPageLoad = state => (state.pageLoad = false);

export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, payload) => (state.errors = payload);

export const setLoading = (state, trueOrFalse) => (state.loading = trueOrFalse);

export const setItems = (state, items) => (state.items = items);

export const clearItems = state => (state.items = []);

export const setItemName = (state, name) => (state.itemName = name);

export const clearItemName = state => (state.itemName = null);

export const setStore = (state, store) => (state.store = store);

export const clearStore = state => (state.store = null);
