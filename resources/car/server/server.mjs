import * as alt from "alt"

alt.on('playerConnect', (player) => {
	// X:-2639.872 Y:1866.812 Z:160.135
	alt.emitClient(player, 'engine:Load')
	alt.log('engine:loadServer')
})
alt.on('player:Spawn', player =>{
	// alt.log(player,'lfasd;fa')
	newVeh(player)
	// alt.log('player:Spawn',newVeh(player))
})
alt.on('playerEnteredVehicle', (player, vehicle, seat) => {
	alt.emitClient(player, 'playerEnteredVehicle', vehicle,seat);
});
// alt.onClient('client:signUp',()=>{
//
// })
function newVeh(player) {
	try {
		console.log('newVeh')
		const vehicle = new alt.Vehicle('exemplar', player.pos.x, player.pos.y, player.pos.z, 0, 0, 0)
		vehicle.fuel = 100
		// vehicle.engineOn = false
		vehicle.basefuel = 10000
		vehicle.lockState= true
	} catch (error) {
		alt.log(error)
	}
}
