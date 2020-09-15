const mongoose = require('mongoose')
const MONGOURL = "mongodb://localhost:27017/altV";
// mongoose.connect('mongodb://localhost:27017/testexpress', {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// }).then(db => console.log('[OK] DB is connected')).catch(err => console.error(err))
const InitiateMongoServer = async () => {
	try {
		await mongoose.connect(MONGOURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log("Connected to DB !!");
	} catch (e) {
		console.log(e,'ERROR');
		throw e;
	}
};
module.exports = InitiateMongoServer
