const express = require('express')
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

// 1. Middlewares

app.use(morgan('dev'))

app.use(express.json())

app.use((req, res, next) => {
	next()
})

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString()
	next()
})

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// 4. Server

module.exports = app
