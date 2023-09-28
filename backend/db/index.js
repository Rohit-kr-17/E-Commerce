const mongoose = require("mongoose");
mongoose
	.connect(
		"mongodb+srv://rohit:Rohit@cluster0.dqpgxid.mongodb.net/?retryWrites=true&w=majority"
	)
	.then(() => {
		console.log("Database is Connected");
	})
	.catch((err) => {
		console.log("Connection Failed", err);
	});
