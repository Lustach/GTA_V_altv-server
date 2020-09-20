import * as alt from "alt"
import './vehicle'

alt.on('playerConnect', (player) => {
	alt.emitClient(player, 'engine:Load')
	alt.log('engine:loadServer')
})
alt.on('player:Spawn', player =>{
	newVeh(player)
})
alt.on('playerEnteredVehicle', (player, vehicle, seat) => {
	alt.emitClient(player, 'playerEnteredVehicle', vehicle,seat);
});
alt.onClient('veh:engineToggle',toggleEngine)
function newVeh(player) {
	try {
		const vehicle = new alt.Vehicle('exemplar', player.pos.x, player.pos.y, player.pos.z, 0, 0, 0)
		vehicle.fuel = 100
		vehicle.basefuel = 10000
		vehicle.lockState= true
	} catch (error) {
		alt.log(error)
	}
}

function toggleEngine(player, data) {
	alt.log('ToggleEngineInserver')
	const vehicle = data.vehicle;
	alt.log(data.vehicle,'data.vehicle!')
	if (!player.vehicle) return;
	let currentEngineOn = vehicle.engineOn
	currentEngineOn = !currentEngineOn ? true : !currentEngineOn;
	if (vehicle.fuel <= 0) {
		currentEngineOn = false;
		vehicle.fuel =0;
		return
	}
	alt.log('toggleEngine', currentEngineOn, vehicle.fuel)
	alt.emitClient(player, 'vehicle:StartEngine', currentEngineOn);
}
