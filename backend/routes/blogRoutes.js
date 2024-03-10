import express from "express";
import { Blog } from "../models/blogModel.js";

const router = express.Router();
router.get('/', async (request,response) => {
    try{
        const blogs = await Blog.find({})
        return response.status(200).json({
            data: blogs
        })
    }
    catch(error){
        console.log(error.message);
        return response.status(400).send({message: error.message});
    }

});
router.get('/:id',async (request,response) => {
    try{
        const { id } = request.params
        const blog_by_id = await Blog.findById(id);
        return response.status(200).json({
            data: blog_by_id
        })
    }
    catch(error){
        console.log(error.message);
        return response.status(400).send({message: error.message});
    }

});
router.post('/',async(request,response) => {
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
router.delete('/:id',async (request,response) => {
    try{
        const { id } = request.params;
        const result = await Blog.findByIdAndDelete(id);
       if(!result){
        return response.status(404).send({message: "Blog not found"})
       }
       return response.status(200).send({message:'Blog deleted'})
    }
    catch(error){
        console.log(error.message);
        return response.status(400).send({message: error.message});
    }

});

export default router;