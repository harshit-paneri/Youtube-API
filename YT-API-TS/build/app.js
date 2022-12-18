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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = require('mongoose');
const fetch_save_1 = require("./fetch_save");
const app = (0, express_1.default)();
const port = 4000;
app.get('/', (req, res) => {
    res.send("Helloo TypeScript");
    (0, fetch_save_1.fetchAndSave)();
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        // 4. Connect to MongoDB
        yield mongoose.connect('mongodb+srv://harshit:harshit@cluster0.3w1rx5w.mongodb.net/?retryWrites=true&w=majority/testing_db');
        console.log("Connected to mongo");
    });
}
run();
setInterval(() => {
    (0, fetch_save_1.fetchAndSave)();
}, 10000);
// TODO START
// GET API for returning the stored video data in a paginated response
// sorted in descending order of published datetime
// app.get("/search", paginatedResults(), (req : any, res: any) => {
// 	res.json(res.paginatedResults);
// });
// Function to carry out pagination by evaluating limit and skipIndex
// from the 'page' and 'limit' query parameters
// function paginatedResults() {
// 	return async (req: any, res : any, next : any) => {
// 		const page : number = parseInt(req.query.page);
// 		const limit : number = parseInt(req.query.limit);
// 		const skipIndex : number = (page - 1) * limit;
// 		const results = {};
// 		try {
// 			results.results = await user.find();
// 			res.paginatedResults = results;
// 			next();
// 		} catch (e) {
// 			res.status(500).json({ message: "Error Occured" });
// 		}
// 	};
// }
// Basic search API to search the stored videos using their title and description
app.post("/search", (req, res) => {
    try {
        (0, fetch_save_1.getYVideos)(req.body.title, req.body.description).then((arr) => {
            res.json(arr);
        });
    }
    catch (e) {
        res.status(500).json({ message: e });
    }
});
app.listen(port, () => {
    console.log(`Connected Successfuly on port ${port}`);
});
