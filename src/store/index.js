import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import state from './state';

import auth from './modules/auth';
import category from './modules/category';
import charts from './modules/charts';
import credit from './modules/credit';
import customer from './modules/customer';
import deliveryNotes from './modules/deliveryNotes';
import inventory from './modules/inventory';
import inventoryItemHistory from './modules/inventoryItemHistory';
import items from './modules/items';
import location from './modules/location';
import moves from './modules/moves';
import purchase from './modules/purchase';
import sales from './modules/sales';
import tax from './modules/tax';
import user from './modules/user';

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules: {
		auth,
		user,
		location,
		credit,
		customer,
		category,
		charts,
		tax,
		moves,
		purchase,
		invt: inventory,
		items,
		sales,
		notes: deliveryNotes,
		history: inventoryItemHistory,
	},
});
