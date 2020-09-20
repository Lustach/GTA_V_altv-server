Vue.config.devtools = true
Vue.prototype.window = window
const app = new Vue({
	el: '#app',
	data() {
		return {
			chooseBtn: true,
		}
	},
	computed: {
		isAlt() {
			return 'alt' in window
		},
	},
	methods: {
		engineToggle() {
			this.chooseBtn=!this.chooseBtn
					console.log('engineOn')
					alt.emit('veh:engineToggle')
		}
	}
})
