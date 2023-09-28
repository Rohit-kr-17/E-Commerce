const mongoose = require("mongoose");
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Database is Connected");
	})
	.catch((err) => {
		console.log("Connection Failed", err);
	});
