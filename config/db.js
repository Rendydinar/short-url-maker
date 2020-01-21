const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); // get mongoURI value from default.json inside config folder

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
		  useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(`error message: ${err.message}`);
		process.exit(1); // exit force the process   		
	}
} 

module.exports = connectDB;