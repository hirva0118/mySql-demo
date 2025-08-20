import Post from "../models/post.model.js"
import ApiResponse from "../utils/ApiResponse.js";
import logger from "../utils/logger.js";

export const getAllPost = async(req,res)=>{
    try {
        const post = await Post.findAll();
        return ApiResponse.success(res,post,"Post fetched successfully");
    } catch (error) {
        logger.error("Error fetching post",error)
        return ApiResponse.error(res,error)
    }
}

export const addPost = async(req,res) => {
    const { title, content, userId } = req.body;
    try {
        const post = await Post.create({ title, content, userId });
        if(!title){
            return ApiResponse.error("Title not found",404);
        }
        if(!userId){
            return ApiResponse.error("userId not provided",404);
        }
        return ApiResponse.success(res,post,"Post added successfully");
    } catch (error) {
        logger.error("Error creating post:", error);
        return ApiResponse.error(res, error);
    }
}

export const updatePost = async(req,res) =>{
    const {id} = req.params;
    const {title,content} = req.body;

    try {
        const post = await Post.findByPk(id);
        if(!post){
            return ApiResponse.error(res,"post not found",404);
        }
        post.title = title || post.title;
        post.content = content || post.content;

        await post.save();
        return ApiResponse.success(res,post,"Post updated successfully");
    } catch (error) {
        logger.error("error updating post",error);
        return ApiResponse.error(res,error)
    }
}

export const deletePost = async(req,res) => {
    const {id} = req.params;
    try {
        const post = await Post.findByPk(id);
        if(!post){
            return ApiResponse.error(res,"Post not found",404);
        }
        await post.destroy();
        return ApiResponse.success(res,null,"Post deleted successfully");
    } catch (error) {
        logger.error("error deleting post",error);
        return ApiResponse.error(res,error);
    }
}