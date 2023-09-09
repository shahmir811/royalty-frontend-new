<template>
	<div>
		<h1 class="page-title">Moved Inventory Items</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<template v-else>
			<b-row>
				<router-link to="/moves">
					<b-button class="admin-users-component-add-new-purchase-button"
						><i class="fa fa-chevron-left" aria-hidden="true"></i> Back
					</b-button>
				</router-link>
			</b-row>

			<b-row class="mt-30 pl-20 w-80p" v-if="itemMoveDetails">
				<table class="table table-bordered">
					<thead class="thead-dark">
						<th>Move Invoice</th>
						<th>From Location</th>
						<th>To Location</th>
						<th>Action Performer</th>
						<th>Date</th>
					</thead>
					<tbody>
						<tr>
							<td>{{ itemMoveDetails.move_invoice_no }}</td>
							<td>{{ itemMoveDetails.from_location }}</td>
							<td>{{ itemMoveDetails.to_location }}</td>
							<td>{{ itemMoveDetails.created_by }}</td>
							<td>{{ itemMoveDetails.created_at }}</td>
						</tr>
					</tbody>
				</table>
			</b-row>

			<b-row>
				<h4 class="pl-20">Details</h4>
			</b-row>

			<b-row class="pl-20 mt-20 w-80p" v-if="itemMoveDetails">
				<table class="table table-bordered">
					<thead>
						<th>#</th>
						<th>Name</th>
						<th>Quantity</th>
					</thead>
					<tbody>
						<tr v-for="(item, index) in itemMoveDetails.details" :key="item.id">
							<td>{{ ++index }}</td>
							<td>{{ item.item_name }}</td>
							<td>{{ item.quantity }}</td>
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
	name: 'AddMovesPage',
	mounted() {
		this.fetchDetails(this.$route.params.id);
	},
	components: {
		Spinner,
	},
	computed: {
		...mapGetters({
			pageLoad: 'moves/pageLoad',
			itemMoveDetails: 'moves/itemMoveDetails',
		}),
	},
	methods: {
		...mapActions({
			fetchDetails: 'moves/fetchItemMoveDetails',
		}),
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';

.w-80p {
	width: 80%;
}

.pl-20 {
	padding-left: 20px;
}
</style>
