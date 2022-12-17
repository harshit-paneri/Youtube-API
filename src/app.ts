import express, { Application } from "express" ;

const app : Application = express();
const port: number = 4000;

app.get('/', (req , res)=>{
    res.send("Helloo TypeScript");
});

app.listen(port, ()=>{
    console.log(`Connected Successfuly on port ${port}`)
})