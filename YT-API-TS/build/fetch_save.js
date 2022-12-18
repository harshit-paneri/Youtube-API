"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYVideos = exports.fetchAndSave = void 0;
const googleapis_1 = require("googleapis");
const database_1 = require("./database");
// Variable to keep the index of the current API key
let apiKeyIndex = 0;
// Fetching youtube videos and saving them to the database
function fetchAndSave() {
    googleapis_1.google.youtube("v3")
        .search.list({
        key: `AIzaSyBHx5sqpUeZ_F0PhnHLMgUJNfe_cSpkWgc`.split(",")[apiKeyIndex],
        maxResults: 10,
        order: "date",
        publishedAfter: "2020-01-01T00:00:00Z",
        q: "laptop reviews",
        relevanceLanguage: "en-us",
        type: ["video"],
    });
    // .then((res) => saveData(res.data.items))
    // .catch((err) => {
    // 	if (isQuotaExceeded(err)) {
    // 		if (`AIzaSyBHx5sqpUeZ_F0PhnHLMgUJNfe_cSpkWgc`.split(",").length > apiKeyIndex) {
    // 			console.log("Ran Out of APIKeys");
    // 		} else {
    // 			console.log("Trying with the next API key...");
    // 			apiKeyIndex++;
    // 		}
    // 	}
    // 	console.log(err);
    // });
}
exports.fetchAndSave = fetchAndSave;
// Function for checking whether the Quota is Exceeded or not
// If the quota is exceeded, then it returns true else false
const isQuotaExceeded = (err) => {
    if (err.code === 403) {
        const errorList = err.error.errors;
        return errorList.has((e) => e.reason === "quotaExceeded");
    }
    else {
        return false;
    }
};
// Mapping the fetched youtube videos to a promise array
// which can be used to determine if all the videos were saved
// to the database or not.
function saveData(items) {
    const promises = items.map(function (vid) {
        const { id: { videoId }, snippet: { publishedAt, title, description, thumbnails }, } = vid;
        const newYvid = new database_1.user({
            id: videoId,
            title,
            description,
            publishedAt: Date.parse(publishedAt),
            thumbnails: {
                default: thumbnails.default.url,
                medium: thumbnails.medium.url,
                high: thumbnails.high.url,
            },
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
function getYVideos(title = "", description = "") {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.user.find({
            title: { $regex: title, $options: "$i" },
            description: { $regex: description, $options: "$i" },
        }).exec();
    });
}
exports.getYVideos = getYVideos;
// 
