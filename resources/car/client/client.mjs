import alt from 'alt'
import * as native from 'natives';
let speedView = new alt.WebView('http://resource/client/html/speedometr/index.html')
let webview = new alt.WebView('http://resource/client/html/index.html')
let playerVehicle = false;
let show = false;
alt.setInterval(() => {
	if (!playerVehicle) {
		return;
	}
	if (show) {
		speedView.emit('speedometr:draw', native.getEntitySpeed(playerVehicle.scriptID), playerVehicle.gear, playerVehicle.rpm, playerVehicle.getSyncedMeta('isEngineOn'));
	}

}, 100);


alt.setInterval(() => {
	if (!playerVehicle) {
		return;
	}
	if (show) {
		speedView.emit('speedometr:drawFuel', playerVehicle.getSyncedMeta('fuel'), playerVehicle.getSyncedMeta('baseFuel'));
		alt.emitServer('updateFuel', playerVehicle)
	}

}, 100);

speedView.on('speedometr:showed', () => {
	show = true
})
speedView.on('speedometr:hide', () => {
	show = false
})

alt.onServer('playerEnteredVehicle', (vehicle, seat) => {
	alt.log('playerEnteredVehicle',seat)
	native.setVehicleEngineOn(alt.Player.local.vehicle.scriptID, false, false, true);
	playerVehicle = vehicle;

	(seat == 1 || 2) && !show && speedView.emit('speedometr:show', true);
});
alt.onServer('playerLeftVehicle', (vehicle, seat) => {
	alt.log('playerLeftVehicle')
	playerVehicle = false;
	show = false
	alt.showCursor(false);
	alt.toggleGameControls(true);
	(seat == 1 || 2) && show && speedView.emit('speedometr:show', false);
});
alt.onServer('playerChangedVehicleSeat', (vehicle, seat) => {
	alt.log('playerChangedVehicleSeat')
	playerVehicle = vehicle;

	(seat == 1 || 2) && !show && speedView.emit('speedometr:show', true);
});
alt.onServer('engine:Load',()=>{
	webview.isVisible = false
})
alt.on('keydown', (e) => {
	if (e === 18) {//alt
		webview.isVisible = true
		webview.focus()
		alt.showCursor(true);
		alt.toggleGameControls(true);
	}
})
alt.on('keyup', (e) => {
	if (e === 18) {//alt
		webview.isVisible = false
	}
})
alt.onServer('vehicle:StartEngine', startEngine)
alt.onServer('playerEnteredVehicle', (vehicle, seat) => {
	native.setVehicleEngineOn(alt.Player.local.vehicle.scriptID, false, false, true);
	playerVehicle = vehicle;
	(seat == 1) && !show && view.emit('speedometr:show', true);
});

webview.on('veh:engineToggle', engineToggle)

function engineToggle() {
	if (!alt.Player.local.vehicle) return;
	const pedInSeat = native.getPedInVehicleSeat(alt.Player.local.vehicle.scriptID, -1);
	if (pedInSeat !== alt.Player.local.scriptID) return;
	alt.emitServer('veh:engineToggle', { vehicle: alt.Player.local.vehicle });
}

function startEngine(value) {
	if (!alt.Player.local.vehicle) return;
	native.setVehicleEngineOn(alt.Player.local.vehicle.scriptID, value, false, true);
	playerVehicle = alt.Player.local.vehicle;
}
