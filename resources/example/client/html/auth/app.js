Vue.config.devtools = true
Vue.prototype.window = window
const app = new Vue({
	el: '#app',
	mounted() {
		this.setInputStyle()
		// if (this.$route.fullPath == '/sign_up') {
		//   this.component = 'SignUp'
		// } else {
		//   this.component = 'Login'
		// }
	},
	data() {
		return {
			user: {
				email: '',
				password: '',
				userName: '',
			},
			test: 'JOPA',
		}
	},
	// component = 'Login'
	computed: {
		isAlt() {
			return 'alt' in window
		}
	},
	methods: {
		login() {
			if(this.isAlt){
				alt.emit('display:Name',()=>{
					alt.log('display:NAME')
				})
			}
		},
		signUp(){
			console.log('signUp')
		},
		setInputStyle() {
			const inputs = document.querySelectorAll('.input')
			inputs.forEach(input => {
				input.addEventListener('focus', () => {
					input.parentNode.parentNode.classList.add('focus')
				})
				input.addEventListener('blur', () => {
					if (input.value == '')
						input.parentNode.parentNode.classList.remove('focus')
				})
			})
			inputs.forEach((input) => {
				if (input.value !== '')
					input.parentNode.parentNode.classList.add('focus')
			})
		},
		// async signUp(e) {
		// 	console.log(this.user, 'SUKAAAA')
		// 	e.preventDefault()
		// 	try {
		// 		const result = await this.$API.user.signUp(this.user.userName, this.user.email, this.user.password)
		// 		this.setLcStore(result.data)
		// 		this.getLcJwt()
		//
		// 	} catch (e) {
		// 		console.log(e)
		// 	}
		// }
	},

})
