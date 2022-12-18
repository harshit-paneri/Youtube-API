import express, { Application } from "express" ;
const mongoose =require('mongoose')
import {user} from './database';
import { fetchAndSave, getYVideos } from "./fetch_save";

const app : Application = express();
const port: number = 4000;



app.get('/', (req , res)=>{
    res.send("Helloo TypeScript");
    fetchAndSave();
});


async function run() {
    // 4. Connect to MongoDB
    await mongoose.connect('mongodb+srv://harshit:harshit@cluster0.3w1rx5w.mongodb.net/?retryWrites=true&w=majority/testing_db');
    console.log("Connected to mongo")
}

run()

setInterval(() => {
	fetchAndSave();
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
		getYVideos(req.body.title, req.body.description).then((arr) => {
			res.json(arr);
		});
	} catch (e) {
		res.status(500).json({ message: e });
	}
});

app.listen(port, ()=>{
    console.log(`Connected Successfuly on port ${port}`)
})