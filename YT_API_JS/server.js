const uri = 'mongodb://localhost:27017/youtubeAPI'

const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
require('dotenv').config()


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

mongoose.connect(uri)
mongoose.connection.on('connected',()=>{
    console.log('connected successfully')
})

let allDocuments = {}

const videoSchema = new mongoose.Schema({
    title:String,
    description:String,
    thumbnail:String,
    publishTime:Date   
})

const Video = mongoose.model('Video',videoSchema)


async function sendRequest(){
    await Video.deleteMany();
    let search = "Songs"

    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&key=${process.env.API_KEY}`)
    .then((res)=>{
        
        let title;
        let publishTime;
        let description;
        let thumbnail;

        
        console.log(res.data)
        for(let i = 0;i<10;i++)
        {
            title = res.data.items[0].snippet.title
            description = res.data.items[0].snippet.description
            thumbnail = res.data.items[0].snippet.thumbnails.default.url
            publishTime = res.data.items[0].snippet.publishTime
            const newVideo = new Video({
                title:title,
                description:description,
                thumbnail:thumbnail,
                publishTime:publishTime

            })
            newVideo.save();
        }

    })

   
}sendRequest();


setInterval(sendRequest,10000)
async function getDocuments(){
    allDocuments = await Video.find()
    return allDocuments
}



app.get('/videos',(req,res) => {
    getDocuments().then(response=>{
        res.send(response);       
    })
})

app.get('/videos/:videoTitle', (req,res)=>{
    Video.findOne({title:req.params.videoTitle}, (err,foundVideo)=>{
        res.send(foundVideo);
        
    })
})

app.listen(5000,()=>{
    console.log('Listening to port 5000');
})



