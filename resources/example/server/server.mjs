import * as alt from 'alt'
import chat from 'chat'
import mongoose from 'mongoose'
import User from './models/User.js'
import bcrypt from 'bcryptjs'

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

InitiateMongoServer()
console.log('test server')
const spawnPos = {
	x: -2639.872,
	y: 1866.812,
	z: 160.135
}
alt.on('playerConnect', (player) => {
	alt.emitClient(player, 'webview:Load')
})

alt.onClient('client:login',async (player,data)=>{
	const result = await getUserByEmail(data.email)
	if (result.length>0 && bcrypt.compareSync(data.password, result[0].password)) {
		player.model = 'mp_m_freemode_01'
		player.spawn(spawnPos.x, spawnPos.y, spawnPos.z, 0)
			alt.emitClient(player,'webview:Hide')
			alt.log('Вошёл')
		alt.emit('player:Spawn',player);
	}
	else{
		alt.log('Такого юзера нет, проверь данные или зарегистрируйся')
	}
})

alt.onClient('client:signUp',async (player,data)=>{
		let user = new User(data)
		const result = await getUserByEmail(data.email)
	if(result.length<0) {
		await user.save(function (err, entity) {
			if (err) return console.error(err)
			entity.password = bcrypt.hashSync(entity.password, 10)
			entity.save()
		})
		player.model = 'mp_m_freemode_01'
		player.spawn(spawnPos.x, spawnPos.y, spawnPos.z, 0)
		alt.emit('player:Spawn', player);
			alt.emitClient(player, 'webview:Hide')
			alt.log('Зарегистрировался')
	}
})

//возвращает ноль если пользователь найден
async function isUserFind(data){
	console.log(data,await User.find( data ),'DATA')
	return (await User.find( data )).length
}
// возвращает массив юзеров
async function getUserByEmail(email){
	console.log(await User.find({ email }))
	return await User.find({ email } )
}

