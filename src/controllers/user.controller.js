import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import logger from "../utils/logger.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return ApiResponse.success(res, users, "Users fetched successfully");
  } catch (error) {
    logger.error("Error fetching users:", error);
    return ApiResponse.error(res, error);
  }
};


export const addUser = async(req,res)=>{
  const {email,name}= req.body;
  try {
    const user = await User.create({email,name})
    return ApiResponse.success(res,user,"User added successfully")
  } catch (error) {
    logger.error("error adding user: ",error)
    return ApiResponse.error(res,error)
  }
}

export const updateUser = async(req,res)=>{
  const {id} = req.params;
  const {email,name} = req.body;

  try {
    const user = await User.findByPk(id);
    if(!user){
      return ApiResponse.error(res,"User not found",404);
    }

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    return ApiResponse.success(res, user,"User updated successfully")
  } catch (error) {
    logger.error("error updating user: ", error);
    return ApiResponse.error(res,error)
  }
}
export const deleteUser = async(req,res)=>{
  const {id} = req.params;
  try {
    const user = await User.findByPk(id);
    if(!user){
      return ApiResponse.error(res,"User not found",404);
    }

    await user.destroy();
    return ApiResponse.success(res,null,"User deleted successfully");
    
  } catch (error) {
    logger.error("error deleting user: ", error);
    return ApiResponse.error(res,error)
  }
}
