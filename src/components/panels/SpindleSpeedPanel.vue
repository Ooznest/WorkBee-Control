<template>
    <v-card>
        <v-card-title>
			<v-icon small class="mr-1">mdi-axis-z-rotate-clockwise</v-icon>
			{{ $t('panel.spindleSpeed.caption') }}
		</v-card-title>
        <v-card-text>
            <v-simple-table>
                <thead>
					<th>Selected</th>
                    <th>{{ $t('panel.spindleSpeed.spindleName') }}</th>
                    <th>{{ $t('panel.spindleSpeed.spindleActive') }}</th>
					<th>{{ $t('panel.spindleSpeed.setRPM') }}</th>
                </thead>
                <tbody>
                    <tr v-for="(tool, index) in visibleTools" :key="index" :class="{'spindle-active' : getSpindle(tool).current > 0 }">
						<template v-if="checkSpindle(tool)">
						<td>
							<v-btn small depressed class="pl-1" fab @click="toolClick(tool)">
							<v-icon v-if="isToolSelected(tool.number)" large class="mr-1">mdi-check-circle-outline</v-icon>
							<v-icon v-if="!isToolSelected(tool.number)" large color="red" class="mr-1">mdi-close-circle-outline</v-icon>
							</v-btn>
						</td>
                        <td>
							<a href="javascript:void(0)" @click="toolClick(tool)">
								{{ tool.name || $t('panel.spindleSpeed.tool', [tool.number]) }}
							</a>
						<br>
							<span class="font-weight-regular caption">T{{ tool.number }}</span>
						</td>
                        <td>
								<v-btn :disabled="!isToolSelected(tool.number)" v-if="getSpindle(tool).current <= 0"  :value="1"  block @click="spindleOn(getSpindle(tool), tool.spindle)">{{ $t('panel.spindleSpeed.turnOn') }}</v-btn>
								<v-btn v-else :value="0" color="primary" block @click="spindleOff(tool.spindle)">{{ $t('panel.spindleSpeed.turnOff') }}</v-btn>
						</td>
						<td>
							<v-combobox :disabled="!isToolSelected(tool.number)" :items="rpmInRange(getSpindle(tool))" :value="getSpindle(tool).active" @input="setActiveRPM($event, tool.spindle)">
							</v-combobox>
							</td>
						</template>
                    </tr>
					<template v-if="!checkSpindleDefined()">
						<tr>
							<td colspan="3">{{ $t('panel.spindleSpeed.noSpindleDefined') }}<a target="_blank" href="https://duet3d.dozuki.com/Wiki/Gcode#Section_M950_Create_heater_fan_spindle_or_GPIO_servo_pin">M950</a>{{ $t('panel.spindleSpeed.toDefineASpindle') }}<a target="_blank" href="https://duet3d.dozuki.com/Wiki/Gcode#Section_M563_Define_or_remove_a_tool">M563</a>{{ $t('panel.spindleSpeed.toAssignTool') }}</td>
						</tr>
					</template>
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
	background-color : #556B2F;
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

.noSpindles {
	text-align: center;
	width:100%;
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
		checkSpindleDefined(){
			let spindleDefined = false;
			let tools = this.visibleTools;
			for(let i = 0; i < tools.length; i++){
				if (this.checkSpindle(tools[i])){
					spindleDefined = true;
				}
			}
			return spindleDefined;
		},
		isToolSelected(tool){
			if (tool == this.currentTool){
				return true
			}else{
				return false
			}
		}
	},
};
</script>

