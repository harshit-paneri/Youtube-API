import express from "express" ;

const app = express();
const port = 4000;

app.get('/', (req, res)=>{
    res.send("hello TypeScript");
});

app.listen(port, ()=>{
    console.log(`Connected Successfuly on port ${port}`)
})