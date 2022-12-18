const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const {
	fetchAndSave,
	getPaginatedYvids,
	getYVideos,
} = require("./fetch_and_save_videos");

const app = express();

app.use(express.json());

// MONGODB

mongoose.connect(process.env.ATLAS_URL);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("Successfully connected to MongoDB ");
});

// Server should call the YouTube API continuously in background (async) with some interval (say 10 seconds) for fetching the latest videos for a predefined search query and should store the data of videos (specifically these fields - Video title, description, publishing datetime, thumbnails URLs and any other fields you require) in a database with proper indexes.
setInterval(() => {
	fetchAndSave();
}, 10000);

// Sorted video with pagination in descending order
app.get("/", paginatedResults(), (req, res) => {
	res.json(res.paginatedResults);
});

//  evaluating limit of pagination and skipIndex and 'page' and 'limit' query parameters
function paginatedResults() {
	return async (req, res, next) => {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		const skipIndex = (page - 1) * limit;
		const results = {};

		try {
			results.results = await getPaginatedYvids(limit, skipIndex);
			res.paginatedResults = results;
			next();
		} catch (e) {
			res.status(500).json({ message: "Error Occured" });
		}
	};
}

// Basic search API to search the stored videos using their title and description
app.post("/search", (req, res) => {
	try {
		getYVideos(req.body.title, req.body.description).then((arr) => {
			res.json(arr);
		});
	} catch (e) {
		res.status(500).json({ message: e });
	}
});

// TODO END

app.listen(3000, function () {
	console.log("Server is running on port 3000");
});
