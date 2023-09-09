<template>
	<div>
		<h1 class="page-title">Delivery Notes</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-row>
				<router-link
					v-if="selectedSale"
					:to="{
						name: 'deliveryNoteDetails',
						params: { saleId: selectedSale.id },
					}"
				>
					<b-button class="admin-users-component-add-new-inventory-button w-195 ml-2"
						><i class="fa fa-plus" aria-hidden="true"></i> Add New</b-button
					>
				</router-link>
				<router-link
					v-if="selectedSale"
					:to="{
						name: 'deliveryNoteHistory',
						params: { saleId: selectedSale.id },
					}"
				>
					<b-button class="admin-users-component-add-new-inventory-button w-195 ml-2"
						><i class="fa fa-bars" aria-hidden="true"></i> Delivery Notes</b-button
					>
				</router-link>
			</b-row>

			<b-row class="pr-20 pb-50">
				<DxDataGrid
					:data-source="sales"
					key-expr="id"
					:allow-column-reordering="true"
					@selection-changed="selectSale"
					:showBorders="true"
					:show-row-lines="true"
					:word-wrap-enabled="true"
					@cell-prepared="onCellPrepared"
				>
					<DxColumn data-field="sale_invoice_no" caption="Invoice No" :fixed="true" />

					<DxColumn data-field="type" caption="Type" alignment="left" />

					<DxColumn data-field="customer_name" caption="Customer Name" alignment="left" />
					<DxColumn data-field="contact_no" caption="Contact Number" alignment="left" />
					<DxColumn data-field="created_by" caption="Created By" alignment="left" />
					<DxColumn data-field="created_at" caption="Date" alignment="left" />
					<DxColumn data-field="delivery_notes" caption="Delivery Notes" alignment="left" />

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

import Spinner from '../../../components/Spinner/Spinner.vue';
import {
	DxDataGrid,
	DxColumn,
	DxFilterRow,
	DxSearchPanel,
	DxSelection,
	DxPaging,
	DxPager,
} from 'devextreme-vue/data-grid';

export default {
	name: 'DeliveryNotes',
	mounted() {
		this.fetchSalesWithDeliveryNotes();
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
	data() {
		return {
			selectedSale: undefined,
		};
	},
	computed: {
		...mapGetters({
			pageLoad: 'sales/pageLoad',
			errors: 'sales/errors',
			role: 'auth/role',
			sales: 'sales/sales',
		}),
	},
	methods: {
		...mapActions({
			fetchSalesWithDeliveryNotes: 'sales/fetchSalesWithDeliveryNotes',
		}),
		selectSale(e) {
			e.component.byKey(e.currentSelectedRowKeys[0]).done(sale => {
				if (sale) {
					this.selectedSale = sale;
				}
			});
		},
		onCellPrepared(e) {
			if (e.rowType == 'data' && e.column.dataField == 'margin') {
				if (e.data.margin > 0) {
					e.cellElement.className += ' greenText';
				} else {
					e.cellElement.className += ' redText';
				}
			}
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';
</style>
