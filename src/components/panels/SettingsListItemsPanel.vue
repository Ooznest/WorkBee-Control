<template>
	<v-card outlined>
		<v-card-title class="pb-0">
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
