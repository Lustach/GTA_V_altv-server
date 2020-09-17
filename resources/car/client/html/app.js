Vue.config.devtools = true
Vue.prototype.window = window
// да, можно сделать через одну функцию и передачу парамтера в качестве on/off, но так должно быть чище...
const events = {
	engineOn: 'engine:On',
	engineOff: 'engine:Off',
}
const app = new Vue({
	el: '#app',
	data() {
		return {}
	},
	computed: {
		isAlt() {
			return 'alt' in window
		},
	},
	methods: {
		engineOn() {
			console.log('engineOn')
			if (this.isAlt)
				if (this.isLogin) {
					alt.emit(events.engineOn)
				} else {
					alt.emit(events.engineOff)
				}
		},
		engineOff() {
			console.log('engineOff')
		}
	}
})
