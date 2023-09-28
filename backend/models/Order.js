const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
	{
		products: [
			{
				type: mongoose.ObjectId,
				ref: "Product",
			},
		],
		payment: {},
		buyers: {
			type: String,
		},
		status: {
			type: String,
			default: "Not Process",
			enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Order", orderSchema);
