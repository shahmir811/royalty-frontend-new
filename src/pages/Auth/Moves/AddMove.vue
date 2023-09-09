<template>
	<div>
		<h1 class="page-title">Move Details</h1>

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

			<b-row class="w-80p">
				<b-col>
					<div>
						<h3>Source:</h3>
						<select class="custom-select" @change="onLocationSourceLocation" v-model="source_location_id">
							<option selected disabled value="null">Source Location</option>
							<option v-for="location in sourceLocations" :key="location.id" :value="location.id">
								{{ location.name }}
							</option>
						</select>
					</div>
				</b-col>
				<b-col>
					<div>
						<h3>Destination:</h3>
						<select class="custom-select" v-model="destination_location_id">
							<option selected disabled value="null">Desitnation Location</option>
							<option v-for="location in destinationLocations" :key="location.id" :value="location.id">
								{{ location.name }}
							</option>
						</select>
					</div>
				</b-col>
			</b-row>

			<b-row class="mt-50">
				<button
					class="admin-users-component-add-new-purchase-button text-white"
					@click.prevent="moveButtonHandler"
					:disabled="loading"
				>
					Move
				</button>
			</b-row>

			<b-row class="mt-30 h-100">
				<b-col>
					<div>
						<h5>Item:</h5>
						<v-select
							placeholder="Select Item"
							:options="inventories"
							:reduce="invt => invt.id"
							:disabled="!destination_location_id"
							v-model="item_id"
							label="item_name"
							@input="onItemChangeHandler"
						/>
					</div>
				</b-col>
				<b-col>
					<div>
						<h5>Quantity:</h5>
						<input type="number" class="form-control" v-model="quantity" />
						<template v-if="selectedInventory">
							<small>Quantity in stock: {{ selectedInventory.quantity }}</small>
						</template>
					</div>
				</b-col>
				<b-col>
					<div class="pt-32">
						<button class="btn btn-success" :disabled="disableAddButton" @click.prevent="addInventoryItem">Add</button>
					</div>
				</b-col>
			</b-row>

			<b-row class="mt-30 w-80p">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>#</th>
							<th>Item Name</th>
							<th>Quantity</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in sourceInventoryItems" :key="item.id">
							<td>{{ ++index }}</td>
							<td>{{ item.item_name }}</td>
							<td>{{ item.moveQuantity }}</td>
							<td>
								<p class="pointer" @click.prevent="removeSelectedItem(item)">Remove</p>
							</td>
						</tr>
					</tbody>
				</table>
			</b-row>
		</template>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import vSelect from 'vue-select';
import Spinner from '../../../components/Spinner/Spinner.vue';

export default {
	name: 'MovesDetailsPage',
	mounted() {
		this.fetchLocations().then(() => {
			this.sourceLocations = JSON.parse(JSON.stringify(this.locations));
		});
	},
	components: {
		Spinner,
		'v-select': vSelect,
	},
	data() {
		return {
			sourceLocations: [],
			destinationLocations: [],
			source_location_id: null,
			destination_location_id: null,
			item_id: null,
			selectedInventory: null,
			sourceInventoryItems: [],
			quantity: null,
		};
	},
	computed: {
		...mapGetters({
			role: 'auth/role',
			locations: 'location/activeLocations',
			pageLoad: 'location/pageLoad',
			errors: 'location/errors',
			inventories: 'invt/inventories',
			loading: 'moves/loading',
		}),
		disableAddButton() {
			if (this.loading) return true;

			if (!this.quantity || parseInt(this.quantity) <= 0) return true;

			if (this.selectedInventory && this.quantity > this.selectedInventory.quantity) return true;

			return false;
		},
	},
	methods: {
		...mapActions({
			fetchLocations: 'location/fetchActiveLocations',
			inventory: 'invt/fetchLocationBasedInventory',
			moveItems: 'moves/moveInventoryItems',
		}),
		onLocationSourceLocation() {
			this.destination_location_id = null;
			this.reset();

			this.destinationLocations = this.sourceLocations.filter(location => location.id !== this.source_location_id);
			this.inventory(this.source_location_id);
		},
		removeSelectedItem(obj) {
			this.sourceInventoryItems = this.sourceInventoryItems.filter(invt => invt.id !== obj.id);
		},
		onItemChangeHandler(e) {
			const itemId = e;
			this.selectedInventory = this.inventories.find(invt => invt.id === parseInt(itemId));
		},
		addInventoryItem() {
			const exists = this.sourceInventoryItems.find(item => item.id === this.selectedInventory.id);

			if (exists) {
				exists.moveQuantity = this.quantity;
			} else {
				const data = { ...this.selectedInventory, moveQuantity: this.quantity };
				this.sourceInventoryItems.push(data);
			}

			this.reset();
		},
		moveButtonHandler() {
			if (this.sourceInventoryItems.length < 1) return false;

			const data = {
				source_location_id: this.source_location_id,
				destination_location_id: this.destination_location_id,
				records: this.sourceInventoryItems,
			};

			this.moveItems(data).then(() => {
				this.reset();
				this.sourceInventoryItems = [];
				this.source_location_id = null;
				this.destination_location_id = null;
			});
		},
		reset() {
			this.item_id = null;
			this.selectedInventory = null;
			this.quantity = null;
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';

.w-80p {
	width: 80%;
}

.h-100 {
	height: 100px;
}

.pt-32 {
	padding-top: 32px;
}

.pointer {
	cursor: pointer;

	&:hover {
		color: red;
		text-decoration: underline;
	}
}
</style>
