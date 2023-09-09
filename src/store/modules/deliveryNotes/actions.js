import axios from '../../BaseUrl';
// import router from '../../../routes/router';

import { getURL } from '../../../helpers/index';

/////////////////////// Fetch all inventory items ///////////////////////

export const fetchAllDeliveryNotes = async ({ commit, dispatch }, saleId) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'all-delivery-notes?sale_id=' + saleId;

	try {
		const response = await axios.get(url);

		commit('setNotesList', response.data.data.notes);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
	}
};

/////////////////////// Add new DeliveryNote ///////////////////////

export const addDeliveryNoteToServer = async ({ commit, dispatch }, data) => {
	commit('startPageLoad');
	commit('clearErrors');

	const url = (await getURL()) + 'create-delivery-note';

	return new Promise((resolve, reject) => {
		axios
			.post(url, data)
			.then(response => {
				// commit('setCustomersList', response.data.data.customers);

				dispatch(
					'flashMessage',
					{
						message: 'Delivery Note added successfully',
						type: 'success',
					},
					{ root: true }
				);

				console.log(response);
				commit('endPageLoad');
				resolve();
			})
			.catch(error => {
				console.log(error);
				commit('endPageLoad');
				commit('setError', error.response.data.errors);
				checkAndRedirect(error.response.status, dispatch);
				reject();
			});
	});
};

/////////////////////// Remove DeliveryNote ///////////////////////

export const removeDeliveryNoteRecordFromServer = async ({ commit, dispatch }, id) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'delete-delivery-note' + '/' + id;

	try {
		await axios.delete(url);

		commit('removeDeliveryNote', id);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
	}
};

/////////////////////// Print DeliveryNote ///////////////////////

export const printDeliveryNote = async ({ commit }, id) => {
	commit('clearErrors');

	const url = (await getURL()) + 'print-delivery-note' + '/' + id;

	axios
		.get(url, { responseType: 'arraybuffer' })
		.then(response => {
			let blob = new Blob([response.data], { type: 'application/pdf' });
			let link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = 'delivery_note.pdf';
			link.click();
		})
		.catch(error => {
			console.log(error);
		});
};

/////////////////////// Remaining Quantity to dispatch ///////////////////////

export const remainingQuantity = async ({ commit, dispatch }, saleId) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'remaining-quantity' + '/' + saleId;

	try {
		const response = await axios.get(url);

		commit('setRemainingItems', response.data.data.record);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
	}
};

/////////////////////// clear Auth State and redirect ///////////////////////

const checkAndRedirect = (status, dispatch) => {
	if (status === 401) {
		dispatch('auth/clearAuth', '', { root: true });
	}
};
