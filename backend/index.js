import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import blogRoutes from "./routes/blogRoutes.js";

const app = express();


app.use(express.json());
app.use(cors());


app.use('/blogs',blogRoutes);


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