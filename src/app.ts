import express, { Application } from "express" ;
const mongoose =require('mongoose')
import {user} from './database'

const app : Application = express();
const port: number = 4000;

app.get('/', (req , res)=>{
    res.send("Helloo TypeScript");
});


async function run() {
    // 4. Connect to MongoDB
    await mongoose.connect('mongodb+srv://harshit:harshit@cluster0.3w1rx5w.mongodb.net/?retryWrites=true&w=majority/testing_db');
    console.log("Connected to mongo")
}

run()

app.listen(port, ()=>{
    console.log(`Connected Successfuly on port ${port}`)
})