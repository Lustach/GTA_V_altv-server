// todo давать ответы на неправильность и валидность полей(при запросах с бэка тоже) и при регистрации
import * as alt from 'alt'
import chat from 'chat'
import mongoose from 'mongoose'
import User from './models/User.js'
import bcrypt from 'bcryptjs'

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
	alt.emitClient(player, 'webview:Load')
})
chat.registerCmd('hello', (player, arg) => {
	alt.emitClient(player, 'hello:World')
})
alt.onClient('client:login',async (player,data)=>{
	// alt.log(await getUser(data),'user')
	// await getUserByEmail(data.email)
	const result = await getUserByEmail(data.email)
	// alt.log(bcrypt.compareSync(data.password, result[0].password),'compare')
	// alt.log(bcrypt.hashSync(password,data.password),'NUI')
	if (result.length>0 && bcrypt.compareSync(data.password, result[0].password)) {
		player.model = 'mp_m_freemode_01'
		player.spawn(spawnPos.x, spawnPos.y, spawnPos.z, 5000)
		alt.setTimeout(()=>{
			alt.emitClient(player,'webview:Hide')
			alt.log('Вошёл')
		},2000)
	}
	else{
		alt.log('Такого юзера нет, проверь данные или зарегистрируйся')
	}
})
alt.onClient('client:signUp',async (player,data)=>{
		let user = new User(data)
		await user.save(function (err, entity) {
			if (err) return console.error(err)
			alt.log(entity,'entity')
			entity.password= bcrypt.hashSync(entity.password,10)
			entity.save()
		})
		player.model = 'mp_m_freemode_01'
		player.spawn(spawnPos.x, spawnPos.y, spawnPos.z, 5000)
		alt.setTimeout(()=>{
			alt.emitClient(player,'webview:Hide')
			alt.log('Зарегистрировался')
		},2000)
})
// chat.registerCmd('loadpage',(player)=>{
//     alt.emitClient(player,'webview:Load')
// })

//возвращает ноль если пользователь найден
async function isUserFind(data){
	console.log(data,await User.find( data ),'DATA')
	return (await User.find( data )).length
}
async function getUserByEmail(email){
	console.log(await User.find({ email }))
	return await User.find({ email } )
}
