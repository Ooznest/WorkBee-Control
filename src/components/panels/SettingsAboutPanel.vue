<template>
	<v-card outlined>
		<v-card-title>
			<span>WorkBee Control 3.3.0 - V1.2</span>
			<v-spacer></v-spacer>
			<a href="https://github.com/Duet3D/DuetWebControl" target="_blank">
				<v-icon small>mdi-star</v-icon> GitHub
			</a>
		</v-card-title>

		<v-card-text class="pt-0">
			{{ $t('panel.settingsAbout.developedBy') }} <a href="mailto:christian@duet3d.com">Christian Hammacher</a> {{ $t('panel.settingsAbout.for') }} <a href="https://www.duet3d.com" target="_blank">Duet3D</a>.
			<br>
			Modified <a href="mailto:sales@ooznest.co.uk"></a> By <a href="https://ooznest.co.uk/" target="_blank">Ooznest</a> for WorkBee Control.
			<br>
			{{ $t('panel.settingsAbout.licensedUnder') }} <a href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank">GNU General Public License v3</a>
		</v-card-text>
	</v-card>
</template>

<script>
'use strict'

import { version } from '../../../package.json'

export default {
	data() {
		return {
			version
		}
	}
}
</script>
