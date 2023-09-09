<template>
	<div class="pb-100">
		<h1 class="page-title">Delivery Note Details</h1>

		<template v-if="pageLoad">
			<Spinner />
		</template>

		<ViewSaleDetails :data="selectedSale" />

		<div class="container">
			<div class="row">
				<b-button
					class="admin-users-component-add-new-inventory-button w-180"
					:disabled="savingRecord"
					@click.prevent="gotoHistoryPage"
				>
					<i class="fa fa-bars" aria-hidden="true"></i> Details
				</b-button>
			</div>
		</div>

		<div class="container">
			<div class="row mtb-50">
				<div class="col-6">
					<h3>Contact</h3>
					<div class="flex-middle">
						<div>
							<input
								type="radio"
								id="one"
								value="same"
								v-model="contact_no_picked"
								@change="onChangeContactNo($event)"
							/>
							<label for="same"> Same as of Sale record</label>
						</div>
						<div>
							<input
								type="radio"
								id="new"
								value="new"
								v-model="contact_no_picked"
								@change="onChangeContactNo($event)"
							/>
							<label for="new"> New</label>
						</div>
					</div>
					<input type="text" class="form-control" v-model="contact_no" :class="{ 'is-invalid': errors.contact_no }" />
					<span class="invalid-feedback left-text" v-if="errors.contact_no">
						<strong>{{ errors.contact_no[0] }}</strong>
					</span>
				</div>
				<div class="col-6">
					<h3>Shipping Address</h3>
					<div class="flex-middle">
						<div>
							<input
								type="radio"
								id="one"
								value="same"
								v-model="shipping_location_picked"
								@change="onChangeShippingLocation($event)"
							/>
							<label for="same"> Same as of Sale record</label>
						</div>
						<div>
							<input
								type="radio"
								id="new"
								value="new"
								v-model="shipping_location_picked"
								@change="onChangeShippingLocation($event)"
							/>
							<label for="new"> New</label>
						</div>
					</div>
					<textarea
						v-model="shipping_location"
						id=""
						cols="20"
						rows="5"
						class="form-control"
						:class="{ 'is-invalid': errors.shipping_location }"
					></textarea>
					<span class="invalid-feedback left-text" v-if="errors.shipping_location">
						<strong>{{ errors.shipping_location[0] }}</strong>
					</span>
				</div>
			</div>

			<div class="row">
				<template v-if="details">
					<table class="table table-striped table-bordered table-sm">
						<tbody>
							<tr v-for="(record, index) in details" :key="index">
								<td>{{ ++index }}</td>
								<td>{{ record.location }}</td>
								<td>{{ record.inventory }}</td>
								<td style="width: 150px">
									<input v-model="record.add" style="width: 90%" type="number" :disabled="record.remaining === '0'" />
								</td>
								<td>{{ record.remaining ? record.remaining : record.quantity }} left</td>
							</tr>
						</tbody>
					</table>
					<button class="btn btn-success" @click.prevent="addNewDeliveryNote" :disabled="savingRecord">Submit</button>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import ViewSaleDetails from '../../../components/DeliveryNote/ViewSaleDetails.vue';
import Spinner from '../../../components/Spinner/Spinner.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'DeliverNoteDetails',
	components: { ViewSaleDetails, Spinner },
	mounted() {
		this.saleId = this.$route.params.saleId;

		if (!this.saleId) {
			this.$router.push('/delivery-notes');
			return;
		}

		if (this.isAuthenticated) {
			this.initFn();
		}
	},
	computed: {
		...mapGetters({
			role: 'auth/role',
			isAuthenticated: 'auth/isAuthenticated',
			pageLoad: 'sales/pageLoad',
			// errors: 'sales/errors',
			selectedSale: 'sales/selectedSale',
			remainingItems: 'notes/remainingItems',
			notes: 'notes/notes',
			errors: 'notes/errors',
		}),
	},
	data() {
		return {
			details: [],
			saleId: null,
			savingRecord: false,
			contact_no: '',
			shipping_location: '',
			contact_no_picked: 'same',
			shipping_location_picked: 'same',
		};
	},
	methods: {
		...mapActions({
			getSaleDetails: 'sales/getSaleDetails',
			addDeliveryNoteToServer: 'notes/addDeliveryNoteToServer',
			remainingQuantity: 'notes/remainingQuantity',
			fetchAllDeliveryNotes: 'notes/fetchAllDeliveryNotes',
		}),
		updateValues() {
			this.saleForm = {
				...this.selectedSale,
			};

			this.contact_no = this.saleForm.contact_no;
			this.shipping_location = this.saleForm.shipping_location;

			this.details = JSON.parse(JSON.stringify(this.selectedSale.details));

			this.mergeInventoryRecords();
			// console.log(this.details);
		},
		mergeInventoryRecords() {
			this.details = this.details.map(itm => ({
				add: 0,
				...this.remainingItems.find(item => item.inventory_id === itm.inventory_id && item),
				...itm,
			}));

			this.selectedSale.details = this.selectedSale.details.map(itm => ({
				...this.remainingItems.find(item => item.inventory_id === itm.inventory_id && item),
				...itm,
			}));
		},
		addNewDeliveryNote() {
			const data = {
				sale_id: this.$route.params.saleId,
				contact_no: this.contact_no,
				shipping_location: this.shipping_location,
				details: this.details,
			};

			this.$swal
				.fire({
					title: 'Are you sure to add this record?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, add it!',
				})
				.then(result => {
					this.savingRecord = true;
					if (result.value) {
						this.addDeliveryNoteToServer(data).then(
							() => {
								this.initFn();
								this.$swal.fire('Done!', 'Delivery Note has been added.', 'success');
								this.contact_no = this.saleForm.contact_no;
								this.shipping_location = this.saleForm.shipping_location;
							},
							() => {
								this.savingRecord = false;
							}
						);
					} else {
						this.savingRecord = false;
					}
				});
		},
		gotoHistoryPage() {
			this.$router.push({ name: 'deliveryNoteHistory', params: { saleId: this.saleId } });
		},
		initFn() {
			this.remainingQuantity(this.saleId);
			this.getSaleDetails(this.saleId).then(() => {
				this.updateValues();
				this.savingRecord = false;
			});
		},
		onChangeContactNo(event) {
			const data = event.target.value;
			this.contact_no = data === 'new' ? '' : this.saleForm.contact_no;
		},
		onChangeShippingLocation(event) {
			const data = event.target.value;
			this.shipping_location = data === 'new' ? '' : this.saleForm.shipping_location;
		},
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';

.dangerColor {
	color: red;
}

.flex-middle {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}
</style>
