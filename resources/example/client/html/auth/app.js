// todo vuelidate так же пошёл гулять как и всё остаальное
Vue.config.devtools = true
Vue.prototype.window = window

// import {minLength, required,email} from 'vuelidate/lib/validators'
// может ещё где пригодится
const events = {
	login: 'webview:login',
	signUp: 'webview:signUp',
}
const app = new Vue({
	el: '#app',
	mounted() {
		this.setInputStyle()
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
	computed: {
		isAlt() {
			return 'alt' in window
		},
		isUserNameValid() {
			return this.user.userName
		},
		isUserEmailValid() {
			return this.isEmailLengthValid && this.isEmailValid
		},
		isEmailLengthValid() {
			return this.user.email.length < 3
		},
		isEmailValid() {
			return this.user.email.indexOf('@') !== -1
		},
		isUserPassValid() {
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
		keyAlt(){
		},
		login() {
			if (this.isAlt)
				if (this.isLogin) {
					alt.emit(events.login, { email: this.user.email, password: this.user.password })
				} else {
					alt.emit(events.signUp, this.user)
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
	},

})
