const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
)

const { Schema } = mongoose

const port = 3000
app.listen(port, () => {
	console.log(`App running on port: ${port}...`)
})
