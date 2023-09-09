<template>
	<div>
		<h1 class="page-title">Delivery Notes</h1>

		<div class="row">
			<router-link
				v-if="saleId"
				:to="{
					name: 'deliveryNoteDetails',
					params: { saleId },
				}"
			>
				<b-button class="admin-users-component-add-new-inventory-button w-195 ml-2"
					><i class="fa fa-plus" aria-hidden="true"></i> Add New</b-button
				>
			</router-link>
		</div>

		<div v-for="note in notes" :key="note.id" class="box-style">
			<table class="table table-sm table-borderless">
				<tbody>
					<tr class="text-left">
						<th>Delivery Note No</th>
						<td>{{ note.delivery_note_no }}</td>
						<th>Created On</th>
						<td>{{ note.created_at }}</td>
						<td class="btn-group">
							<button class="btn btn-sm btn-primary mr-20" @click.prevent="print(note.id)">Print</button>
							<button v-if="role === 'admin'" class="btn btn-danger btn-sm" @click.prevent="deleteNote(note.id)">
								Remove
							</button>
						</td>
					</tr>
					<tr class="text-left">
						<th>Contact No</th>
						<td>{{ note.contact_no }}</td>
						<th>Shipping Address</th>
						<td>{{ note.shipping_location }}</td>
					</tr>
				</tbody>
			</table>
			<table class="table table-bordered table-sm">
				<tbody>
					<tr v-for="(detail, index) in note.details" :key="detail.id">
						<td>{{ ++index }}</td>
						<td>{{ detail.location_name }}</td>
						<td>{{ detail.inventory_item }}</td>
						<td style="width: 225px">
							{{ detail.quantity }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'DeliveryNoteAccordionComponent',
	props: ['notes'],
	mounted() {
		this.saleId = this.$route.params.saleId;
	},
	data() {
		return {
			saleId: null,
		};
	},
	computed: {
		...mapGetters({
			role: 'auth/role',
		}),
	},
	methods: {
		...mapActions({
			removeDeliveryNote: 'notes/removeDeliveryNoteRecordFromServer',
			printDeliveryNote: 'notes/printDeliveryNote',
		}),
		print(id) {
			this.printDeliveryNote(id);
		},
		deleteNote(id) {
			this.$swal
				.fire({
					title: 'Are you sure to remove this record?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, remove it!',
				})
				.then(result => {
					if (result.value) {
						this.removeDeliveryNote(id).then(() => {
							this.$swal.fire('Done!', 'Record has been removed.', 'success');
						});
					}
				});
		},
	},
};
</script>

<style lang="scss">
@import '../../styles/styles.scss';

.box-style {
	border: 1px solid grey;
	box-shadow: 5px 10px #888888;
	margin: 30px 0;
	background-color: #f2f2f2;
}

.btn-group {
	width: 250px;
}
</style>
