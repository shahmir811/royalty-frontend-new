<template>
	<div>
		<h1 class="page-title">Inventory Items Movement</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-row>
				<router-link to="/add-move">
					<b-button class="admin-users-component-add-new-purchase-button"
						><i class="fa fa-plus" aria-hidden="true"></i> Add
					</b-button>
				</router-link>

				<router-link
					v-if="selectedMoveItem"
					:to="{
						name: 'move-details',
						params: { id: selectedMoveItem.id },
					}"
				>
					<b-button class="admin-users-component-add-new-inventory-button w-195 ml-2"
						><i class="fa fa-bars" aria-hidden="true"></i> Details</b-button
					>
				</router-link>
			</b-row>

			<b-row class="pr-20 pb-50">
				<DxDataGrid
					:data-source="items"
					key-expr="id"
					:allow-column-reordering="true"
					@selection-changed="selectItem"
					:showBorders="true"
					:show-row-lines="true"
				>
					<DxColumn data-field="from_location" caption="From Location" :fixed="true" />
					<DxColumn data-field="to_location" caption="To Location" :fixed="true" />
					<DxColumn data-field="created_at" caption="Date" alignment="center" />
					<DxColumn data-field="created_by" caption="Action Performer" alignment="center" />

					<DxSelection mode="single" />
					<DxFilterRow :visible="true" />
					<DxSearchPanel :visible="true" />
					<DxPaging :enabled="true" :page-size="25" />
					<DxPager :show-navigation-buttons="true" :show-info="true" info-text="Page #{0}. Total: {1} ({2} items)" />
				</DxDataGrid>
			</b-row>
		</template>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import {
	DxColumn,
	DxDataGrid,
	DxFilterRow,
	DxPager,
	DxPaging,
	DxSearchPanel,
	DxSelection,
} from 'devextreme-vue/data-grid';
import Spinner from '../../../components/Spinner/Spinner.vue';

export default {
	name: 'MovesPage',
	mounted() {
		this.fetchItems();
	},
	components: {
		Spinner,
		DxDataGrid,
		DxColumn,
		DxFilterRow,
		DxSearchPanel,
		DxSelection,
		DxPaging,
		DxPager,
	},
	computed: {
		...mapGetters({
			role: 'auth/role',
			items: 'moves/items',
			pageLoad: 'moves/pageLoad',
			errors: 'moves/errors',
		}),
	},
	data() {
		return {
			selectedMoveItem: undefined,
		};
	},
	methods: {
		...mapActions({
			fetchItems: 'moves/fetchMoveItems',
		}),
		selectItem(e) {
			e.component.byKey(e.currentSelectedRowKeys[0]).done(item => {
				if (item) {
					this.selectedMoveItem = item;
				}
			});
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';
</style>
