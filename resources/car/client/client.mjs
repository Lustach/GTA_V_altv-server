import * as alt from 'alt'
let webview
let playerVehicle = false;
import * as native from 'natives';
alt.onServer('engine:Load',()=>{
	alt.log('YEa');
	console.log('hop')
	// webview = new alt.WebView('http://resource/client/html/car/index.html')
	alt.showCursor(true)
	// webview.focus()
	// alt.showCursor(true)
	// webview.on('webview:login',(data)=> {
	// 	alt.emitServer('client:login',data)
	// })
	// webview.on('webview:signUp',(data)=> {
	// 	alt.emitServer('client:signUp',data)
	// })
})
alt.on('keydown', (e) => {
	if (e === 18) {//alt
		webview = new alt.WebView('http://resource/client/html/index.html')
		webview.focus()
		alt.showCursor(true);
		alt.toggleGameControls(true);
	}
})
alt.on('keyup', (e) => {
	if (e === 18) {//alt
		alt.log('ssai')
		webview.isVisible = false
		// webview = new alt.WebView('http://resource/client/html/index.html')
		// webview.focus()
		// alt.log(webview.url)
		//
		// alt.showCursor(true);
		// alt.toggleGameControls(true);
		// if(webview.url && webview.isVisible){
		// 	webview.isVisible = false
		// }
		// else if(webview.url && !webview.isVisible){
		// 	alt.log('nehi')
		// 	webview.isVisible = true
		// }
	}
})

alt.onServer('playerEnteredVehicle', (vehicle, seat) => {
	alt.log('playerEnteredVehicle')
	native.setVehicleEngineOn(alt.Player.local.vehicle.scriptID, false, false, true);
	playerVehicle = vehicle;

	// (seat == 1) && !show && view.emit('speedometr:show', true);
});

alt.onServer('engine:On',(data)=> {
	//todo какого хуя?
	native.setVehicleEngineOn(playerVehicle, true, true, false);
	// alt.emitServer('engine:On',data)
})
alt.onServer('engine:Off',(data)=> {
	//todo какого хуя?
	native.setVehicleEngineOn(playerVehicle, false, true, false);
	// alt.emitServer('engine:Off',data)
})
