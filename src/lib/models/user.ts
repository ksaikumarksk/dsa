import mongoose, { Schema, Document, Model } from "mongoose";

export interface User extends Document {
    _id: string; 
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<User>({
    _id: String,
    name:{type:String, required:true, unique:true, match:/^[a-zA-Z0-9]+$/},
    email:{type:String, required:true, unique:true, match:/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/},
    password:{type:String,required:true},

})
const UserModel:Model<User> = mongoose.models.User || mongoose.model("User",userSchema)

export default UserModel