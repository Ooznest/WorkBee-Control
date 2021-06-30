'use strict'

import i18n from '../../i18n'
import Vue from 'vue';

import { registerRoute } from '../../routes';
import { registerPluginContextMenuItem, ContextMenuType } from '../index.js';
import CNCGCodeViewer from './GCodeViewer.vue';
import ColorPicker from './ColorPicker.vue';

Vue.component('gcodeviewer-color-picker', ColorPicker);

registerRoute(CNCGCodeViewer, {
	Control: {
		GCodeViewer: {
			icon: 'mdi-rotate-3d',
			caption: 'plugins.gcodeViewer.caption',
			path: '/CNCGCodeViewer',
		},
	},
});

registerPluginContextMenuItem(() => i18n.t('plugins.CNCgcodeViewer.view3D'), '/CNCGCodeViewer', 'mdi-rotate-3d', 'view-3d-model', ContextMenuType.JobFileList);
