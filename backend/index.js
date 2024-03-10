import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import blogRoutes from "./routes/blogRoutes.js";

const app = express();


app.use(express.json());
app.use(cors());

// app.get('/',(request,response) => {
//     console.log(request);
//     return response.status(202).send("Welcome to MERN")
// });

app.use('/blogs',blogRoutes);

// app.use((req, res, next) => {
//     console.log(`Incoming request: ${req.method} ${req.url}`);
//     next();
// });

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