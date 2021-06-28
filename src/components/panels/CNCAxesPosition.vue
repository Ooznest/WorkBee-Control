<template>
    <v-card>
        <v-card-title class="py-4">
            <v-icon small class="mr-1">mdi-axis-arrow</v-icon>
			{{ machinePosition ? $t('panel.status.machinePosition') : $t('panel.status.toolPosition') }}
        </v-card-title>
        <v-card-text class="pb-6">
            <v-row align-content="center" no-gutters :class="{'large-font' : !machinePosition}">
                <v-col v-for="(axis, index) in visibleAxes" :key="index" class="d-flex flex-column align-center">
                    <div :class="{'large-font-height' : !machinePosition}">
                        {{ axis.letter }}
                    </div>
                    <div>
                        {{ displayAxisPosition(axis, index) }}
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>


<style scoped>

@media screen and (max-width:600px)
{
	.large-font-height {
		height:35px;
	}
	.large-font {
		font-size:30px;
	}
}

@media screen and (min-width:601px)
{
	.large-font-height {
		height: 55px;
	}
	.large-font {
		font-size: 50px;
	}
}


</style>

<script>
'use strict'
import { mapState } from 'vuex';
export default {
	props: {
		machinePosition: {
			type: Boolean,
			required: true,
		},
	},
	computed: {
		...mapState('machine/model', {
			move: state => state.move,
			status: state => state.state.status,
		}),
		visibleAxes() {
			return this.move.axes.filter(axis => axis.visible);
		},
	},
	methods: {
		displayAxisPosition(axis) {
			const position = this.machinePosition ? axis.machinePosition : axis.userPosition ;
			return axis.letter === 'Z' ? this.$displayZ(position, false) : this.$display(position, 1);
		},
	},
};
</script>

