<template>
	<div>
		<h1 class="page-title">Items</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-row>
				<router-link to="/add-item">
					<b-button class="admin-users-component-add-new-location-button"
						><i class="fa fa-plus" aria-hidden="true"></i> Add Item</b-button
					>
				</router-link>
				<router-link
					v-if="selectedItem"
					:to="{
						name: 'update-item',
						params: { id: selectedItem.id },
					}"
				>
					<b-button class="admin-users-component-add-new-inventory-button w-190 ml-2"
						><i class="fa fa-pencil" aria-hidden="true"></i>
						Update Item
					</b-button>
				</router-link>
				<b-button
					v-if="role === 'admin' && selectedItem"
					href="#"
					class="admin-users-component-change-status-button ml-2"
					@click.prevent="onDeleteHandler(selectedItem.id)"
				>
					<i class="fa fa-times" aria-hidden="true"></i> Remove
				</b-button>
			</b-row>

			<b-row class="pr-20 pb-50">
				<DxDataGrid
					:data-source="items"
					key-expr="id"
					:allow-column-reordering="true"
					@selection-changed="selectItem"
					:showBorders="true"
					:show-row-lines="true"
					:word-wrap-enabled="true"
				>
					<DxColumn data-field="name" :fixed="true" sort-order="asc" :width="400" />
					<DxColumn data-field="category" caption="Category" alignment="left" :width="300" />
					<DxColumn data-field="package" caption="Package" alignment="center" />
					<DxColumn data-field="cbm" caption="CBM" alignment="center" />
					<DxColumn data-field="weight" caption="Weight" alignment="center" />
					<DxColumn data-field="description" caption="Description" :width="600" :allow-row-resizing="true" />

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
import { mapGetters, mapActions } from 'vuex';
import {
	DxDataGrid,
	DxColumn,
	DxFilterRow,
	DxSearchPanel,
	DxSelection,
	DxPaging,
	DxPager,
} from 'devextreme-vue/data-grid';

import Spinner from '../../../components/Spinner/Spinner.vue';

export default {
	name: 'ItemsPage',
	mounted() {
		this.fetchAllItems();
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
			items: 'items/items',
			pageLoad: 'items/pageLoad',
			errors: 'items/errors',
		}),
	},
	data() {
		return {
			selectedItem: undefined,
		};
	},
	methods: {
		...mapActions({
			fetchAllItems: 'items/fetchAllItems',
			changeItemStatus: 'items/changeItemStatus',
		}),
		selectItem(e) {
			e.component.byKey(e.currentSelectedRowKeys[0]).done(item => {
				if (item) {
					this.selectedItem = item;
				}
			});
		},
		onDeleteHandler(selectedItemId) {
			this.$swal
				.fire({
					title: 'Are you sure to remove this item?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, remove it!',
				})
				.then(result => {
					if (result.value) {
						this.changeItemStatus(selectedItemId).then(() => {
							this.$swal.fire('Done!', 'Item has been removed.', 'success');
						});
					}
				});
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';
</style>
