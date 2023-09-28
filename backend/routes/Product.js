const express = require("express");
const {
	createProduct,
	getProduct,
	filterByCategory,
	filterByPrice,
} = require("../controllers/Product");
const { uploadImage } = require("../middlewares/multer");
const router = express.Router();

router.post("/create", uploadImage.single("image"), createProduct);
router.get("/", getProduct);
router.get("/filter-by-price", filterByPrice);
router.get("/filter-by-category", filterByCategory);

module.exports = router;
