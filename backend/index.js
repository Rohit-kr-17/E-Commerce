const express = require("express");
const cors = require("cors");
const app = express();
const productRouter = require("./routes/Product");
require("./db");
app.use(cors());
app.use(express.json());
app.use("/api/product", productRouter);

app.listen(8000, (req, res) => {
	console.log(`Server is running on port 8000`);
});
