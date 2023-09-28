const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		price: {
			type: Number,
			trim: true,
			required: true,
		},
		image: {
			type: Object,
			url: String,
			public_id: String,
			required: true,
		},
		category: {
			type: String,
			trim: true,
			required: true,
		},
		rating: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model("Product", productSchema);
