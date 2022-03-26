const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
)

// console.log(DB)

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

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`App running on port: ${port}...`)
})
