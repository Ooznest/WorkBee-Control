<template>
    <v-card>
        <v-card-title><v-icon>mdi-45hammer-screwdriver</v-icon> Spindles</v-card-title>
        <v-card-text>
            <v-simple-table>
                <thead>
                    <th>Spindle Name</th>
                    <th>Active</th>
					<th>Set RPM</th>
                </thead>
                <tbody>
                    <tr v-for="(tool, index) in visibleTools" :key="index" :class="{'spindle-active' : tool.current > 0 }">
						<template v-if="checkSpindle(tool)">
                        <td>
							<a href="javascript:void(0)" @click="toolClick(tool)">
								{{ tool.name || $t('panel.tools.tool', [tool.number]) }}
							</a>
						<br>
							<span class="font-weight-regular caption">T{{ tool.number }}</span>
						</td>
                        <td>
								<v-btn v-if="getSpindle(tool).current <= 0"  :value="1"  block @click="spindleOn(getSpindle(tool), tool.spindle)">Turn On</v-btn>
								<v-btn v-else :value="0" color="primary" block @click="spindleOff(tool.spindle)">Turn Off</v-btn>
						</td>
						<td>
							<v-combobox :items="rpmInRange(getSpindle(tool))" :value="getSpindle(tool).active" @input="setActiveRPM($event, tool.spindle)">
							</v-combobox>
							</td>
						</template>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-card-text>
    </v-card>
</template>

<style scoped>
td {
	text-align: center;
	vertical-align: middle;
}

.spindle-active { 
	background-color : #00BB00;
}

.spindle-on {
	animation: spindle-on-pulse 5s infinite;
}

.show {
	visibility: visible;
}

.hide {
	visibility: hidden;
}


@keyframes spindle-on-pulse {
	0% {
		background-color: #00AA00;
	}
	50% {
		background-color: #00FF00;
	}
	100% {
		background-color: #00AA00;
	}
}
</style>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { DisconnectedError } from '../../utils/errors.js'

//import store from '../../store'
export default {
	computed: {
		...mapGetters(['isConnected', 'uiFrozen']),
		...mapState('machine/model', ['state']),
		...mapState('machine/model', {
			spindles: state => state.spindles,
			currentTool: state => state.state.currentTool,
			tools: state => state.tools,

		}),
		...mapState('machine',{
			spindleRPMs: state => state.settings.spindleRPM
		}),
		visibleTools() {
			return this.tools.filter(tool => tool !== null);
		},
	},
	data() {
		return {
			waitingForCode: false,
		}
	},
	methods: {
		...mapActions('machine', ['sendCode']),
		getSpindle(tool){
			return this.spindles[tool.spindle];
		},
		async setActiveRPM(value, index){
			let code = `M3 P${index} S${value}`;
			await this.sendCode(code);
		},
		async spindleOn(spindle, index) {
			let code = `M3 P${index} S${spindle.active}`;
			await this.sendCode(code);
		},
		async spindleOff( index) {
			this.sendCode(`M5 P${index}`);
		},
			rpmInRange(spindle){
				let rpms =  this.spindleRPMs.filter(rpm => rpm >= spindle.min && rpm <= spindle.max).reverse();
				if(!rpms.includes(0)){
					rpms.unshift(0);
				}
			return rpms;
		},
		checkSpindle(tool) {
			return (tool.spindle >= 0) ? true : false;
		},
		toolClick(tool) {
			if (!this.isConnected) {
				return;
			}
			this.waitingForCode = true;
			try {
				if (this.state.currentTool === tool.number) {
					// Deselect current tool
					this.sendCode('T-1');
				} else {
					// Select new tool
					this.sendCode(`T${tool.number}`);
				}
			} catch (e) {
				if (!(e instanceof DisconnectedError)) {
					this.$log('error', e.message);
				}
			}
			this.waitingForCode = false;
		},

	},
};
</script>

