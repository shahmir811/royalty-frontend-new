<template>
	<div>
		<h1 class="page-title">Inventory History</h1>

		<b-row>
			<router-link to="/inventory">
				<b-button class="admin-users-component-add-new-inventory-button"
					><i class="fa fa-chevron-left" aria-hidden="true"></i> Back
				</b-button>
			</router-link>
		</b-row>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-row class="justify-content-md-center">
				<h4>
					<u>{{ itemName }}</u>
				</h4>
			</b-row>

			<b-row class="justify-content-md-center">
				<h6>({{ store }})</h6>
			</b-row>

			<b-row class="mt-30">
				<table class="table">
					<thead>
						<tr>
							<th scope="col">Status</th>
							<th scope="col">Quantity</th>
							<th scope="col">Description</th>
							<th scope="col">Move Invoice</th>
							<th scope="col">Purchase Invoice</th>
							<th scope="col">Sale Invoice</th>
							<th scope="col">Action Performer</th>
							<th scope="col">Created At</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in items" :key="item.id">
							<th scope="row" class="text-left">{{ item.status }}</th>
							<td>{{ item.quantity }}</td>
							<td class="text-left">{{ item.description }}</td>
							<td>
								<router-link
									:to="{
										name: 'move-details',
										params: { id: item.move_id },
									}"
									target="_blank"
								>
									{{ item.move_invoice_no }}
								</router-link>
							</td>
							<td>
								<router-link
									:to="{
										name: 'purchase-details',
										params: { id: item.purchase_id },
									}"
									target="_blank"
								>
									{{ item.purchased_invoice_no }}
								</router-link>
							</td>
							<td>
								<router-link
									:to="{
										name: 'sale-details',
										params: { id: item.sale_id },
									}"
									target="_blank"
								>
									{{ item.sale_invoice_no }}
								</router-link>
							</td>
							<td>{{ item.action_performer }}</td>
							<td>{{ item.created_at }}</td>
						</tr>
					</tbody>
				</table>
			</b-row>
		</template>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Spinner from '../../../components/Spinner/Spinner.vue';

export default {
	name: 'InventoryHistory',
	mounted() {
		this.fetchHistory(this.$route.params.id);
	},
	computed: {
		...mapGetters({
			loading: 'history/loading',
			items: 'history/items',
			pageLoad: 'history/pageLoad',
			itemName: 'history/itemName',
			store: 'history/store',
		}),
	},
	components: {
		Spinner,
	},
	methods: {
		...mapActions({
			fetchHistory: 'history/fetchInventoryItemsHistory',
		}),
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';
</style>
