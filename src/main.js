'use strict'

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
import './components'

import App from './App.vue'
import i18n from './i18n'
import './plugins'
import router from './routes'
import store from './store'
import './registerServiceWorker.js'

Vue.config.productionTip = false
Vue.use(Vuetify)

export default new Vue({
	el: '#app',
	i18n,
	render: h => h(App),
	router,
	store,
	vuetify: new Vuetify({
		icons: {
			iconfont: 'mdiSvg',
		},
		lang: { t: (key, ...params) => i18n.t(key, params) },
		theme: {
			dark: true,
			themes: {
				light: {
					primary: '#ff751a',
					secondary: '#ff751a',
					accent: '#ff751a',
					error: '#ff1a1a',
					info: '#ff751a',
					success: '#ff751a',
					warning: '#ff1a1a',
					green: '#008000'
				},
				dark: {
					primary: '#ff751a',
					secondary: '#ff751a',
					accent: '#ff751a',
					error: '#ff1a1a',
					info: '#ff751a',
					success: '#ff751a',
					warning: '#ff1a1a',
					green: '#008000'
				},
			},
		},
	})
})
