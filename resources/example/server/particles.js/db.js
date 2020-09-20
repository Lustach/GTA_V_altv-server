const mongoose = require('mongoose')
const MONGOURL = "mongodb://localhost:27017/altV";
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
