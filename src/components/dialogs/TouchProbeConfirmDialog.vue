<template>
	<v-dialog v-model="internalShown" @keydown.escape="dismissed" persistent width="480">
		<v-card>
			<v-card-title>
				<span class="headline">
					{{ title }}
				</span>
			</v-card-title>

			<v-card-text>
				{{ prompt }}
			<v-row dense>
			<v-col cols="12" class="pt-5">
			{{ $t('dialog.confirmTouchProbe.checkWorking') }}
			</v-col>
			</v-row>
			<v-row dense>
			<v-col cols="12">
			<div><strong>{{ $t("panel.touchProbePanel.probeStatus") }}</strong>
			<span><strong> {{ formatProbeValue(probes[0].value) }}</strong></span></div>
			</v-col>
			</v-row>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="dismissed">{{ $t('generic.no') }}</v-btn>
				<v-btn color="blue darken-1" text @click="confirmed">{{ $t('generic.yes') }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
'use strict'

import { mapState } from "vuex";
import {ProbeType} from '../../store/machine/modelEnums.js';

export default {
	props: {
		title: {
			type: String,
			required: true
		},
		prompt: {
			type: String,
			required: true
		},
		shown: {
			type: Boolean,
			required: true
		}
	},
	computed: {
		...mapState('machine/model', {
			sensors: (state) => state.sensors,
		}),

		probes() {
			return this.sensors.probes.filter((probe) => probe !== null && probe.type !== ProbeType.none);
		},

		internalShown: {
			get() { return this.shown; },
			set(value) {
				if (value) {
					this.confirmed();
				} else {
					this.dismissed();
				}
			}
		}
	},
	methods: {
		formatProbeValue(value) {
			if (value == 0) {
				return this.$t('panel.touchProbePanel.probeNotTriggered')
			}
			return this.$t('panel.touchProbePanel.probeTriggered')
		},
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
