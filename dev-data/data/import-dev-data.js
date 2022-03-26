const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Tour = require('../../models/tourModel')

dotenv.config({ path: './../../config.env' })

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
)

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((con) => {
		console.log('connected Successfully')
		// console.log(con.connection)
	})
	.catch((err) => {
		console.log('Not connected')
	})

// Read JSON File
const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
)

// Import data from DB
const importData = async () => {
	try {
		await Tour.create(tours)
		console.log('Data successfully Loaded')
	} catch (err) {
		console.log(err)
	}
	process.exit()
}

// Delete all the data from DB
const deleteData = async () => {
	try {
		await Tour.deleteMany()
		console.log('Data successfully Deleted')
	} catch (err) {
		console.log(err)
	}
	process.exit()
}

if (process.argv[2] === '--import') importData()
if (process.argv[2] === '--delete') deleteData()
