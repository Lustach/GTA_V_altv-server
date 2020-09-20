Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
	el: '#app',
	data() {
		return {
			show: false,
			speed:0,
			gear:0,
			rpm:0,
			fuel:100,
			isEngineOn:true,
			baseFuel:1000
		};
	},
	mounted() {


		if ('alt' in window) {
			alt.on('speedometr:show', (e) => {
				this.show = e;
				e ? alt.emit('speedometr:showed') : alt.emit('speedometr:hide')
			});
			alt.on('speedometr:draw', (speed, gear, rpm, isEngineOn) => {
				this.speed = ((speed != undefined ? speed : 0) * 3.6).toFixed(1);
				this.gear = gear!=undefined ? gear : 'N';
				this.rpm = rpm != undefined ? rpm : 0;
				this.isEngineOn = isEngineOn
				this.$refs.rpm.style.height = this.rpm*175+'px'
				if (this.rpm>0.9) {
					this.$refs.rpm.style.backgroundColor = '#ff5722'
				}else if (this.rpm > 0.3) {
					this.$refs.rpm.style.backgroundColor = '#ff9800'
				}else{
					this.$refs.rpm.style.backgroundColor = '#8bc34a'
				}

			})
			alt.on('speedometr:drawFuel',(fuel,baseFuel)=>{
				this.fuel=fuel
				this.baseFuel = baseFuel ? baseFuel:10000
				this.$refs.fuel.style.height = (this.fuel / this.baseFuel)*100+'px'
			})
		}
	},
});
