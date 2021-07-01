<style scoped>
.category-header {
	flex: 0 0 100px;
}
</style>

<template>
	<div>
		<v-row align="stretch" dense>
			<v-col cols="3" lg="2" md="2" order="1" order-lg="1" sm="4">
				<v-card class="justify-center fill-height">
					<v-card-title>
						<v-icon small class="mr-1">mdi-information</v-icon>
						{{ $t('panel.status.caption') }}
					</v-card-title>
					<v-card-text>
						<status-label v-if="status"></status-label>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" lg="4" md="4" order="4" order-md="2" sm="12">
				<cnc-axes-position :machinePosition="true" class="fill-height"></cnc-axes-position>
			</v-col>
			<v-col cols="5" lg="3" md="3" order="2" order-lg="3" sm="4">
				<v-card class="fill-height">
					<v-card-title>
						<v-icon small class="mr-1">mdi-speedometer-medium</v-icon>
						{{ $t('panel.status.requestedSpeed') }}
					</v-card-title>
					<v-card-text>{{ $display((move.currentMove.requestedSpeed*60), 0, 'mm/min') }}</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="4" lg="3" md="3" order="2" order-lg="4" sm="4">
				<v-card class="fill-height" order="5">
					<v-card-title>
						<v-icon small class="mr-1">mdi-speedometer</v-icon>
						{{ $t('panel.status.topSpeed') }}
					</v-card-title>
					<v-card-text>{{ $display((move.currentMove.topSpeed*60), 0, 'mm/min') }}</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" order="7">
				<cnc-axes-position :machinePosition="false" class="fill-height"></cnc-axes-position>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import {mapState} from 'vuex';

export default {
	computed: {
		...mapState('machine/model', {
			move: (state) => state.move,
			machineMode: (state) => state.state.machineMode,
			status: (state) => state.state.status,
		}),
		visibleAxes() {
			return this.move.axes.filter((axis) => axis.visible);
		},
	},
	methods: {
		displayAxisPosition(axis) {
			const position = this.displayToolPosition ? axis.userPosition : axis.machinePosition;
			return axis.letter === 'Z' ? this.$displayZ(position, false) : this.$display(position, 1);
		},
	},
};
</script>
