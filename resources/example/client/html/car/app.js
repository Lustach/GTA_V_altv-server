Vue.config.devtools = true
Vue.prototype.window = window

const app = new Vue({
	ell: '#appp',
	mounted() {
	},
	data(){
		return {

		}
	},
	methods:{
		keyAlt(){
			console.log('keyup')
		},
	}
})
