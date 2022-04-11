const mongoose = require('mongoose')
const slugify = require('slugify')

const { Schema } = mongoose

const tourSchema = Schema(
	{
		name: {
			type: String,
			required: [true, 'A tour must have a name'],
			unique: true,
			trim: true,
		},
		slug: String,
		duration: {
			type: Number,
			required: [true, 'A tour must have duration'],
		},
		maxGroupSize: {
			type: Number,
			required: [true, 'A tour must have a group size'],
		},
		difficulty: {
			type: String,
			required: [true, 'A tour must have difficulty assigned'],
		},
		ratingsAverage: {
			type: Number,
			default: 4.5,
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		price: {
			type: Number,
			required: [true, 'A tour must have a price'],
		},
		priceDiscount: Number,
		summary: {
			type: String,
			trim: true,
			required: [true, 'A tour must have summary'],
		},
		description: {
			type: String,
			trim: true,
		},
		imageCover: {
			type: String,
			required: [true, 'A tour must have cover image'],
		},
		images: [String],
		createdAt: {
			type: Date,
			default: Date.now(),
			select: false,
		},
		startDates: [Date],
	},
	{
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
	}
)

tourSchema.virtual('durationWeeks').get(function () {
	return this.duration / 7
})

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true })
	next()
})

// tourSchema.pre('save', function (next) {
// 	console.log('Will save doc....')
// 	next()
// })

// tourSchema.post('save', function (doc, next) {
// 	console.log(doc)
// 	next()
// })

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
