const Tour = require('./../models/tourModel')

exports.getAllTours = async (req, res) => {
	try {
		console.log(req.query)

		// BUILD QUERY

		// 1a. Filtering
		const queryObj = { ...req.query }
		const excludedFields = ['page', 'sort', 'limit', 'fields']
		excludedFields.forEach((el) => delete queryObj[el])

		// 1b. Advance Filtering
		let queryStr = JSON.stringify(queryObj)
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

		// console.log(JSON.parse(queryStr))

		let query = Tour.find(JSON.parse(queryStr))

		// 2. Sorting
		if (req.query.sort) {
			const sortBy = req.query.sort.split(',').join(' ')
			// console.log(sortBy)
			query = query.sort(req.query.sort)
		} else {
			query = query.sort('-createdAt')
		}

		// 3. Field Limiting
		if (req.query.fields) {
			const fields = req.query.fields.split(',').join(' ')
			query = query.select(fields)
		} else {
			query = query.select('-__v')
		}

		// 4. Pagination
		const page = req.query.page * 1 || 1
		const limit = req.query.limit * 1 || 100
		const skip = (page - 1) * limit

		query = query.skip(skip).limit(limit)

		if (req.query.page) {
			const numTours = await Tour.countDocuments()
			if (skip >= numTours) throw new Error('This page does not exist')
		}

		// Execute Query
		const tours = await query

		res.status(200).json({
			status: 'success',
			results: tours.length,
			data: {
				tours,
			},
		})
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: 'Invalid data send',
		})
	}
}

exports.getTour = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id)
		res.status(200).json({
			status: 'success',
			data: {
				tour,
			},
		})
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: 'Invalid data send',
		})
	}
}

exports.createTour = async (req, res) => {
	try {
		const newTour = await Tour.create(req.body)
		res.status(201).json({
			status: 'success',
			data: {
				tour: newTour,
			},
		})
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: 'Invalid data send',
		})
	}
}

exports.updateTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
		res.status(200).json({
			status: 'success',
			data: {
				tour,
			},
		})
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: 'Invalid data send',
		})
	}
}

exports.deleteTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndDelete(req.params.id)
		res.status(200).json({
			status: 'success',
			data: {
				tour,
			},
		})
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: 'Invalid data send',
		})
	}
}
