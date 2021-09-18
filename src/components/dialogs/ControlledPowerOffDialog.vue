<template>
	<v-dialog :value="shown" persistent width="480">
		<v-card color="primary" class="pt-3" dark>
			<v-card-text>
				{{ this.$t('dialog.controlledPowerOffDialog.message') }}
				<v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
'use strict'

import { mapState } from 'vuex'

export default {
	computed: {
		...mapState('machine/model', ['isPausing'])
	},
	props: {
		shown: {
			type: Boolean,
			required: true
		}
	},
}
</script>
