<template>
	<v-card>
		<v-card-title class="pb-1">
			<v-icon small class="mr-1">mdi-wrench</v-icon> {{ $t('panel.jobControl.caption') }}
		</v-card-title>

		<v-card-text class="pt-0">
			<code-btn color="warning" block :disabled="uiFrozen || !isPrinting" :code="isPaused ? 'M24' : 'M25'" tabindex="0">
				<v-icon class="mr-1">{{ isPaused ? 'mdi-play' : 'mdi-pause' }}</v-icon> {{ pauseResumeText }}
			</code-btn>

			<code-btn v-if="isPaused" color="error" block code="M0 H1">
				<v-icon class="mr-1">mdi-stop</v-icon> {{ cancelText }}
			</code-btn>

			<code-btn v-if="!isPrinting && processAnotherCode" color="success" block :code="processAnotherCode">
				<v-icon class="mr-1">mdi-restart</v-icon> {{ processAnotherText }}
			</code-btn>

			<v-switch :label="$t('panel.jobControl.autoSleep')" v-model="autoSleepActive" :disabled="uiFrozen" hide-details></v-switch>

			<v-row class="pt-5">
			<v-col cols="12">
			<v-icon v-if="!isPaused" small class="mr-1">mdi-power-plug</v-icon>{{ $t('panel.jobControl.captionPowerLoss') }}
			</v-col>
			<v-col cols="12" class="pt-0">
				<v-btn v-if="!isPrinting" color="success" block :disabled="uiFrozen" @click="showPowerLossConfirm = true">
				<v-icon class="mr-1">mdi-play</v-icon> {{ $t('panel.jobControl.powerLossResume') }}
			</v-btn>
			<code-btn v-if="isPrinting && !isPaused" color="error" block :disabled="uiFrozen" v-on:click.native="showIsPausing = true" :code="'M25'">
				<v-icon class="mr-1">mdi-power-plug</v-icon> {{ $t('panel.jobControl.controlledPowerOff') }}
			</code-btn>
			</v-col>
			</v-row>

		</v-card-text>
	<confirm-dialog :shown.sync="showPowerLossConfirm" :title="$t('dialog.powerLossConfirm.title')" :prompt="$t('dialog.powerLossConfirm.prompt')" @confirmed="powerLossConfirm"></confirm-dialog>
	<confirm-dialog :shown.sync="showPowerLossSpindleConfirm" :title="$t('dialog.powerLossSpindleConfirm.title')" :prompt="$t('dialog.powerLossSpindleConfirm.prompt')" @confirmed="powerLossSpindleConfirm"></confirm-dialog>
	<confirmed-power-off-dialog :shown.sync="showIsPaused" :message="$t('dialog.confirmPowerOffDialog.message')" @dismissed="showIsPausing = false"></confirmed-power-off-dialog>
	<controlled-power-off-dialog :shown.sync="showIsPausing"></controlled-power-off-dialog>
	</v-card>
</template>

<script>
'use strict'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import { MachineMode, StatusType, isPaused, isPrinting } from '../../store/machine/modelEnums.js'

export default {
	computed: {
		...mapState('machine', ['autoSleep']),
		...mapState('machine/model', {
			lastFileName: state => state.job.lastFileName,
			lastFileSimulated: state => state.job.lastFileSimulated,
			machineMode: state => state.state.machineMode,
			status: state => state.state.status,
			move: state => state.move
		}),
		...mapGetters(['uiFrozen']),
		autoSleepActive: {
			get() { return this.autoSleep; },
			set(value) { this.setAutoSleep(value) }
		},
		isPaused() { return isPaused(this.status); },
		isPrinting() { return isPrinting(this.status); },
		pauseResumeText() {
			if (this.isSimulating) {
				return this.$t(this.isPaused ? 'panel.jobControl.resumeSimulation' : 'panel.jobControl.pauseSimulation');
			}
			if (this.machineMode === MachineMode.fff) {
				return this.$t(this.isPaused ? 'panel.jobControl.resumePrint' : 'panel.jobControl.pausePrint');
			}
			return this.$t(this.isPaused ? 'panel.jobControl.resumeJob' : 'panel.jobControl.pauseJob');
		},
		cancelText() {
			if (this.isSimulating) {
				return this.$t('panel.jobControl.cancelSimulation');
			}
			if (this.machineMode === MachineMode.fff) {
				return this.$t('panel.jobControl.cancelPrint');
			}
			return this.$t('panel.jobControl.cancelJob');
		},
		processAnotherCode() {
			if (this.lastFileName) {
				if (this.lastFileSimulated) {
					return `M37 P"${this.lastFileName}"`;
				}
				return `M32 "${this.lastFileName}"`;
			}
			return '';
		},
		processAnotherText() {
			if (this.lastFileSimulated) {
				return this.$t('panel.jobControl.repeatSimulation');
			}
			if (this.machineMode === MachineMode.fff) {
				return this.$t('panel.jobControl.repeatPrint');
			}
			return this.$t('panel.jobControl.repeatJob');
		},
		showIsPaused() {
				return ((this.move.currentMove.requestedSpeed == 0) && (this.showIsPausing))? true : false;
		},
	},
	data() {
		return {
			showPowerLossConfirm: false,
			showPowerLossSpindleConfirm: false,
			showIsPausing: false,
			isSimulating: false
		}
	},
	methods: {
		...mapMutations('machine', ['setAutoSleep']),
		...mapActions('machine', ['sendCode']),
		mounted() {
			this.isSimulating = (this.status === StatusType.simulating);
		},
		powerLossConfirm(){
			this.showPowerLossSpindleConfirm = true;
		},
		powerLossSpindleConfirm(){
			this.sendCode(`M916`);
		},
	},
	watch: {
		status(to) {
			if (to === StatusType.simulating) {
				this.isSimulating = true;
			} else if (!this.isPrinting) {
				this.isSimulating = false;
			}
		}
	}
}
</script>
