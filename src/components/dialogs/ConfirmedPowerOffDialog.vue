<template>
	<v-dialog :value="shown" persistent width="480">
		<v-card class="pl-3 pt-5">
			<v-card-text>
				<span>{{ message }}</span>
			</v-card-text>

			<v-card-actions class="pt-0">
				<v-spacer></v-spacer>
				<v-btn color="success" text @click="dismissed">{{ $t('generic.cancel') }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
'use strict'

import { mapState } from 'vuex'

export default {
	computed: {
		...mapState('machine/model', ['isPaused'])
	},
	props: {
		message: {
			type: String,
			required: true
		},
		shown: {
			type: Boolean,
			required: true
		}
	},
	methods: {
		confirmed() {
			this.$emit('confirmed');
			this.$emit('update:shown', false);
		},
		dismissed() {
			this.$emit('dismissed');
			this.$emit('update:shown', false);
		}
	}
}
</script>
