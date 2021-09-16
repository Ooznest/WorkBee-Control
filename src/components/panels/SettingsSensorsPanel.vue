<style scoped>
	.probe-span {
		border-radius: 5px;
	}
	.probe-span:not(:last-child) {
		margin-right: 8px;
	}
</style>


<template>
	<v-card outlined>
		<v-card-title class="pb-0">
			{{ $t('panel.status.sensors') }}
		</v-card-title>

		<v-card-text>
           <v-row class="flex-nowrap" no-gutters>
				<v-col>
					<v-row align-content="center" justify="center" no-gutters>
						<v-col class="d-flex flex-column align-center" v-if="boards.length && boards[0].vIn.current > 0">
							<strong>{{ $t('panel.status.vIn') }}</strong>
							<v-tooltip bottom>
								<template #activator="{ on }">
									<span class="text-no-wrap" v-on="on">{{ $display(boards[0].vIn.current, 1, 'V') }}</span>
								</template>
								{{ $t('panel.status.minMax', [$display(boards[0].vIn.min, 1, 'V'), $display(boards[0].vIn.max, 1, 'V')]) }}
							</v-tooltip>
						</v-col>

						<v-col class="d-flex flex-column align-center" v-if="boards.length && boards[0].v12.current > 0">
							<strong>{{ $t('panel.status.v12') }}</strong>
							<v-tooltip bottom>
								<template #activator="{ on }">
									<span class="text-no-wrap" v-on="on">{{ $display(boards[0].v12.current, 1, 'V') }}</span>
								</template>
								{{ $t('panel.status.minMax', [$display(boards[0].v12.min, 1, 'V'), $display(boards[0].v12.max, 1, 'V')]) }}
							</v-tooltip>
						</v-col>

						<v-col class="d-flex flex-column align-center" v-if="boards.length && boards[0].mcuTemp.current > -273">
							<strong class="text-no-wrap">{{ $t('panel.status.mcuTemp') }}</strong>
							<v-tooltip bottom>
								<template #activator="{ on }">
									<span class="text-no-wrap" v-on="on">{{ $display(boards[0].mcuTemp.current, 1, '°C') }}</span>
								</template>
								{{ $t('panel.status.minMax', [$display(boards[0].mcuTemp.min, 1, '°C'), $display(boards[0].mcuTemp.max, 1, '°C')]) }}
							</v-tooltip>
						</v-col>

						<v-col class="d-flex flex-column align-center" v-if="fanRPM.length">
							<strong>{{ $t('panel.status.fanRPM') }}</strong>

							<div class="d-flex flex-row">
								<template v-for="(item, index) in fanRPM">
									<template v-if="index !== 0">,</template>
									<span :key="index" :title="item.name" class="mx-0">{{ item.rpm }}</span>
								</template>
							</div>
						</v-col>

						<v-col class="d-flex flex-column align-center" v-if="probesPresent">
							<strong>{{ $tc('panel.status.probe', sensors.probes.length) }}</strong>
							<div class="d-flex-inline">
								<span :class="probeSpanClasses(probe, index)" :key="index" class="pa-1 probe-span" v-for="(probe, index) in probes">{{ formatProbeValue(probe.value) }}</span>
							</div>
						</v-col>

						<v-col class="d-flex flex-column align-center" v-for="(analog, index) in analogs" :key="index" >
								<strong>{{analog.name}}</strong>
								<div class="d-flex-inline">
									<span class="pa-1 probe-span" >{{ analog.lastReading }}</span>
								</div>
						</v-col>

					</v-row>
					<v-divider class="mx-5 my-4"></v-divider>
					<v-row align-content="center" no-gutters>
						<v-col class="d-flex flex-column align-left">
							<strong>{{ $tc('panel.sensors.endstopStatus') }}</strong>
						</v-col>
						<v-col v-for="(axis, index) in visibleAxes" :key="index" class="d-flex flex-column align-center">
							<div>
								{{ axis.letter }}
								</div>
							<div>
								{{ displayEndstopStatus(index) }}
								</div>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
'use strict'

import {mapState} from 'vuex';
import {ProbeType, isPrinting, AnalogSensorType} from '../../store/machine/modelEnums.js';

export default {
	computed: {
        ...mapState('machine/model', {
			move: (state) => state.move,
			machineMode: (state) => state.state.machineMode,
			status: (state) => state.state.status,
			sensors: (state) => state.sensors,
			boards: (state) => state.boards,
			fans: (state) => state.fans,
		}),
		fanRPM() {
			return this.fans
				.filter((fan) => fan && fan.rpm >= 0)
				.map(
					(fan, index) => ({
						name: fan.name || this.$t('panel.fan.fan', [index]),
						rpm: fan.rpm,
					}),
					this
				);
		},
		probesPresent() {
			return this.sensors.probes.some((probe) => probe && probe.type !== ProbeType.none);
		},
		probes() {
			return this.sensors.probes.filter((probe) => probe !== null && probe.type !== ProbeType.none);
		},
		sensorsPresent() {
			return (this.boards.length && this.boards[0].vIn.current > 0) || (this.boards.length && this.boards[0].v12.current > 0) || (this.boards.length && this.boards[0].mcuTemp.current > -273) || this.fanRPM.length !== 0 || this.probesPresent;
		},
		analogsPresent() {
			return this.sensors.analog.some((analog) => analog && analog.type !== AnalogSensorType.unknown && analog.type !== null);
		},
		analogs() {
			return this.sensors.analog.filter((analog) => analog !== null && analog.name !== null && analog.name !== '' && analog.type !== AnalogSensorType.unknown && analog.type !== null);
		},
		visibleAxes() {
			return this.move.axes.filter(axis => axis.visible);
		},
	},
	methods: {
		formatProbeValue(values) {
			if (values.length === 1) {
				return values[0];
			}
			return `${values[0]} (${values.slice(1).join(', ')})`;
		},
		probeSpanClasses(probe, index) {
			let result = [];
			if (index && this.sensors.probes.length > 1) {
				result.push('ml-2');
			}
			if (!isPrinting(this.stats) && probe.value !== null) {
				if (probe.value >= probe.threshold) {
					result.push('red');
				} else if (probe.value > probe.threshold * 0.9) {
					result.push('orange');
				}
			}
			return result;
		},
		displayEndstopStatus(index) {

			if (this.sensors.endstops[index] != null){
			return (this.sensors.endstops[index].triggered)? this.$t('panel.sensors.endstopTriggered') : this.$t('panel.sensors.endstopNotTriggered');
			}else{
			// add undefined status 
			}

		}
	}
}
</script>
