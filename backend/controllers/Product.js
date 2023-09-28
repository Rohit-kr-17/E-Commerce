const Product = require("../models/Product.js");
const { uploadImageToCloud } = require("../utils/helper.js");

exports.createProduct = async (req, res) => {
	try {
		const { name, price, category } = req.body;
		const { file } = req;
		const newProduct = new Product({ name, price, category });
		if (file) {
			const { url, public_id } = await uploadImageToCloud(file.path);
			newProduct.image = { url, public_id };
		}
		await newProduct.save();
		res.status(200).send({
			success: true,
			message: "Product added successfully",
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			success: false,
			message: "Server Error",
		});
	}
};
exports.getProduct = async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).send({
			success: true,
			product,
		});
	} catch (err) {
		console.log(err);
		res.status(400).send({
			success: false,
			message: "Error while Fetching Products",
			error,
		});
	}
};
exports.filterByCategory = async (req, res) => {
	try {
		const { category } = req.query;
		const product = await Product.find({ category: `${category}` });
		res.status(200).send({
			success: true,
			product,
		});
	} catch (err) {
		console.log(err);
		res.status(400).send({
			success: false,
			message: "Error while Filtering Products",
			error,
		});
	}
};
exports.filterByPrice = async (req, res) => {
	try {
		const { minPrice, maxPrice } = req.query;
		const filteredProducts = await Product.find({
			price: {
				$gte: parseFloat(minPrice), // Convert to float if needed
				$lte: parseFloat(maxPrice),
			},
		});

		res.status(200).send({
			success: true,
			product,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};
