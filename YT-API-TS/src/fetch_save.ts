import { google } from "googleapis";
import {user} from "./database";

// Variable to keep the index of the current API key


// Fetching youtube videos and saving them to the database
function fetchAndSave() {
	google.youtube("v3")
		.search.list({
			key: `AIzaSyBHx5sqpUeZ_F0PhnHLMgUJNfe_cSpkWgc`,
			maxResults: 10,
			order: "date",
			publishedAfter: "2020-01-01T00:00:00Z",
			q: "laptop reviews",
			relevanceLanguage: "en-us",
			type: ["video"],
		})
		.then((res) => saveData(res.data.items))
		.catch((err) => {
			console.log(err);
		});
}

// Function for checking whether the Quota is Exceeded or not
// If the quota is exceeded, then it returns true else false
const isQuotaExceeded = (err: any) => {
	if (err.code === 403) {
		const errorList = err.error.errors;
		return errorList.has((e: any) => e.reason === "quotaExceeded");
	} else {
		return false;
	}
};



// Mapping the fetched youtube videos to a promise array
// which can be used to determine if all the videos were saved
// to the database or not.
function saveData(items: any[]) {
	const promises = items.map(function (vid: any) {
		const {
			id: { videoId },
			snippet: { publishedAt, title, description, thumbnails },
		} = vid;

		const newYvid = new user({
			id: videoId,
			title,
			description,
			publishedAt: Date.parse(publishedAt),
			// thumbnails: {
			// 	default: thumbnails.default.url,
			// 	medium: thumbnails.medium.url,
			// 	high: thumbnails.high.url,
			// },
		});

		return newYvid.save();
	});

	// Promise.all(promises).then({
	// 	await let a = console.log("Added fetched results to the database")}
	// );
}

// Function to get the paginated results from the database
// function getPaginatedYvids(limit: number, skipIndex: number) {
// 	return user.find()
// 		.sort({ publishedAt: -1 })
// 		.limit(limit)
// 		.skip(skipIndex)
// 		.exec();
// }

// Function to get the videos containing particular title
// and description from the database
async function getYVideos(title: string = "", description: string = "") {
	return await user.find({
		title: { $regex: title, $options: "$i" },
		description: { $regex: description, $options: "$i" },
	}).exec();
}

export { fetchAndSave, getYVideos };

// a