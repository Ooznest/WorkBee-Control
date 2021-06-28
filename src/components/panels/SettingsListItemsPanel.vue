<template>
	<v-card outlined>
		<v-card-title class="pb-0">
			<v-icon small class="mr-1">mdi-axis-z-rotate-clockwise</v-icon>
			{{ $t('panel.settingsListItems.spindleRPM') }}
		</v-card-title>

		<v-card-text>
			<list-editor itemKey="spindleRPM"></list-editor>
		</v-card-text>

	</v-card>
</template>

<script>
'use strict'

export default {
	// required for v-tabs to work properly
}
</script>
