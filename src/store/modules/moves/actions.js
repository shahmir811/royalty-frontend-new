import { getURL } from '../../../helpers/index';
import axios from '../../BaseUrl';

/////////////////////// Fetch all move items history ///////////////////////

export const fetchMoveItems = async ({ commit, dispatch }) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'moves';

	try {
		const response = await axios.get(url);

		commit('setItems', response.data.data.moves);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
		commit('endPageLoad');
	}
};

/////////////////////// Move inventory items ///////////////////////

export const moveInventoryItems = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);

	const url = (await getURL()) + 'moves';

	return new Promise((resolve, reject) => {
		axios
			.post(url, data)
			.then(() => {
				commit('setLoading', false);

				dispatch(
					'flashMessage',
					{
						message: 'Inventory Items moves successfully',
						type: 'success',
					},
					{ root: true }
				);

				resolve();
			})
			.catch(error => {
				console.log(error);
				commit('setLoading', false);
				checkAndRedirect(error.response.status, dispatch);
				reject();
			});
	});
};

/////////////////////// Fetch specific move detail ///////////////////////

export const fetchItemMoveDetails = async ({ commit, dispatch }, id) => {
	commit('startPageLoad');
	commit('setItemMoveDetails', null);

	const url = (await getURL()) + 'move-details/' + id;

	try {
		const response = await axios.get(url);

		commit('setItemMoveDetails', response.data.data.move);

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
