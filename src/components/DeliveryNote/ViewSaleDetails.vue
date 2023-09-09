<template>
	<div>
		<div class="container">
			<h4 class="text-left">Sale Details</h4>
			<div class="row" v-if="data">
				<table class="table table-bordered table-sm">
					<tbody>
						<tr class="text-left thead-light">
							<th>Sale Invoice No</th>
							<td>{{ data.sale_invoice_no }}</td>
							<th>Type</th>
							<td>{{ data.type }}</td>
							<th>Created On</th>
							<td>{{ data.created_at }}</td>
						</tr>
						<tr class="text-left thead-light">
							<th>Customer Name</th>
							<td>{{ data.customer_name }}</td>
							<th>Contact No</th>
							<td>{{ data.contact_no }}</td>
							<th>Shipping Address</th>
							<td>{{ data.shipping_location }}</td>
						</tr>
						<tr class="text-left thead-light">
							<th>Status</th>
							<td>{{ data.status }}</td>
							<th></th>
							<td></td>
							<th></th>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="row mt-20" v-if="data">
				<table class="table table-striped table-bordered table-sm">
					<thead class="">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Location</th>
							<th scope="col">Item</th>
							<th scope="col">Quantity</th>
							<th scope="col">Remaining</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(record, index) in data.details" :key="index">
							<td>{{ ++index }}</td>
							<td>{{ record.location }}</td>
							<td>{{ record.name }}</td>
							<td>{{ record.quantity }}</td>
							<td>{{ record.remaining ? record.remaining : record.quantity }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SaleDetailsComponent',
	props: ['data'],
};
</script>

<style lang="scss">
@import '../../styles/styles.scss';
</style>
