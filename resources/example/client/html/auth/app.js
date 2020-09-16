// todo vuelidate так же пошёл гулять как и всё остаальное
Vue.config.devtools = true
Vue.prototype.window = window

// import {minLength, required,email} from 'vuelidate/lib/validators'
// может ещё где пригодится
const vars = {
	login: 'webview:login',
	signUp: 'webview:signUp',
}
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
			isLogin: true,//регистрация или вход
			user: {
				email: '',
				password: '',
				userName: '',
			},
			validations: {
				user: {
					email: {
						required: true,
						email: true
					},
					password: {
						required: true,
						minLength: 5,
					},
					userName: {
						required: true
					},
				}
			}
		}
	},
	// component = 'Login'
	computed: {
		isAlt() {
			return 'alt' in window
		},
		isUserNameValid() {
			console.log(Boolean(this.user.userName), 'validUserName')
			return this.user.userName
		},
		isUserEmailValid() {
			console.log(Boolean(this.user.email.includes('@')), 'validUserEmail')
			return this.isEmailLengthValid && this.isEmailValid
		},
		isEmailLengthValid() {
			return this.user.email.length < 3
		},
		isEmailValid() {
			return this.user.email.indexOf('@') !== -1
		},
		isUserPassValid() {
			console.log(Boolean(this.user.password.length > 4), 'validUserPass')
			return this.user.password.length > 4
		},
		validForm() {
			if (this.isLogin) {
				return this.isUserEmailValid && this.isUserPassValid
			} else {
				return this.isUserEmailValid && this.isUserNameValid && this.isUserPassValid
			}
		}
	},
	methods: {
		login() {
			if (this.isAlt)
				if (this.isLogin) {
					alt.emit(vars.login, { email: this.user.email, password: this.user.password })
				} else {
					alt.emit(vars.signUp, this.user)
				}
		},
		isLoginRevert() {
			this.isLogin = !this.isLogin
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
