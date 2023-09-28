const express = require("express");
const {
	createProduct,
	getProduct,
	filterByCategory,
	filterByPrice,
	braintreeTokenController,
	braintreePaymentsController,
} = require("../controllers/Product");
const { uploadImage } = require("../middlewares/multer");
const router = express.Router();

router.post("/create", uploadImage.single("image"), createProduct);
router.get("/get-product", getProduct);
router.get("/filter-by-price", filterByPrice);
router.get("/filter-by-category", filterByCategory);
router.get("/braintree/token", braintreeTokenController);
router.post("/braintree/payment", braintreePaymentsController);

module.exports = router;
