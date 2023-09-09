<template>
	<div class="pb-100">
		<template v-if="pageLoad">
			<Spinner />
		</template>

		<div v-if="notes"><Accordion :notes="notes" /></div>
	</div>
</template>

<script>
import DeliveryNoteAccordionComponent from '../../../components/DeliveryNote/DeliveryNoteAccordion.vue';
import Spinner from '../../../components/Spinner/Spinner.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'DeliveryNoteHistoryPage',
	components: { Spinner, Accordion: DeliveryNoteAccordionComponent },
	mounted() {
		const saleId = this.$route.params.saleId;

		if (!saleId) {
			this.$router.push('/delivery-notes');
			return;
		}

		this.fetchAllDeliveryNotes(saleId);
	},
	computed: {
		...mapGetters({
			role: 'auth/role',
			isAuthenticated: 'auth/isAuthenticated',
			pageLoad: 'sales/pageLoad',
			errors: 'sales/errors',
			selectedSale: 'sales/selectedSale',
			remainingItems: 'notes/remainingItems',
			notes: 'notes/notes',
		}),
	},
	methods: {
		...mapActions({
			getSaleDetails: 'sales/getSaleDetails',
			addDeliveryNoteToServer: 'notes/addDeliveryNoteToServer',
			remainingQuantity: 'notes/remainingQuantity',
			fetchAllDeliveryNotes: 'notes/fetchAllDeliveryNotes',
		}),
	},
};
</script>

<style lang="scss">
@import '../../../styles/styles.scss';
</style>
