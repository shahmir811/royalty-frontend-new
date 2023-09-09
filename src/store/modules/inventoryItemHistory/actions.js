import { getURL } from '../../../helpers/index';
import axios from '../../BaseUrl';

/////////////////////// Fetch all purchases ///////////////////////

export const fetchInventoryItemsHistory = async ({ commit, dispatch }, id) => {
	commit('startPageLoad');
	commit('clearItems');
	commit('clearItemName');
	commit('clearStore');

	const url = (await getURL()) + 'inventory-item-history' + '/' + id;

	try {
		const response = await axios.get(url);

		commit('setItems', response.data.data.hist);
		commit('setItemName', response.data.data.item_name);
		commit('setStore', response.data.data.location);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
		commit('endPageLoad');
	}
};

/////////////////////// clear Auth State and redirect ///////////////////////
const checkAndRedirect = (status, dispatch) => {
	if (status === 401) {
		dispatch('auth/clearAuth', '', { root: true });
	}
};
