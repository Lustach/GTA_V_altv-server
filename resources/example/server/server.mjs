import * as alt from 'alt'
import chat from 'chat'
import mongoose from 'mongoose'
import User from './models/User.js'
// let user = new User({
// })
// const mongoose = require('mongoose')
const MONGO_URL = "mongodb://localhost:27017/altV"
const InitiateMongoServer = async () => {
	try {
		await mongoose.connect(MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		console.log("Connected to DB !!")
		console.log(User(), typeof User)
		const user = new User({ username: 'Silence', password: '123', email: 'lusta.vlad2001@gmail.com' })
		if (!User.find( user['username'] )) {
			user.save(function (err, silence) {
				if (err) return console.error(err)
				silence.save()
			})
		}
		let data = []
		await User.find(function (err, kittens) {
			if (err) return console.error(err)
			console.log(kittens, 'KITTENS')
			data.push(kittens)
		})
		console.log(data, 'push')
		console.log(user)
		let result = await User.find({ username: 'Silence' })
		console.log(result, 'result')
	} catch (e) {
		console.log(e, 'ERROR')
		throw e
	}
}

// const InitiateMongoServer = require("particles.js/db")
InitiateMongoServer()
console.log('test server')
const spawnPos = {
	x: -2639.872,
	y: 1866.812,
	z: 160.135
}
alt.on('playerConnect', (player) => {
	// X:-2639.872 Y:1866.812 Z:160.135
	player.model = 'mp_m_freemode_01'
	player.spawn(spawnPos.x, spawnPos.y, spawnPos.z, 5000)
	alt.emitClient(player, 'webview:Load')
})
chat.registerCmd('hello', (player, arg) => {
	alt.emitClient(player, 'hello:World')
})
// chat.registerCmd('loadpage',(player)=>{
//     alt.emitClient(player,'webview:Load')
// })
