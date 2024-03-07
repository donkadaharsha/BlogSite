import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Blog } from "./models/blogModel.js";
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());
app.get('/',(request,response) => {
    console.log(request);
    return response.status(202).send("Welcome to MERN")
});

app.get('/blogs',async (request,response) => {
    try{
        const blogs = await Blog.find({});
        return response.status(200).json({
            data: blogs
        })
    }
    catch(error){
        console.log(error.message);
        return response.status(400).send({message: error.message});
    }

});

app.post('/blogs',async(request,response) => {
    try{
        if(
            !request.body.title ||
            !request.body.imgPath ||
            !request.body.description
        ){
            return response.status(400).send({
                message: 'send all required fields: title, imagepath, description',
            })
        }
        const newBlog = {
            title: request.body.title,
            imgPath: request.body.imgPath,
            description: request.body.description,
        };

        const createBlog = await Blog.create(newBlog);
        return response.status(201).send(createBlog);

    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        app.listen(PORT, ()  => {
            console.log(`App is listening to ${PORT}`);
        });
    })
    .catch((error) =>{
        console.log(error);
    })