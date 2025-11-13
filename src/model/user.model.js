import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
    }
},{
    timestamps:true
})


userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.checkPassword = async function(password){
    return await bcrypt.compare(password , this.password);
}

const User  = mongoose.model('User', userSchema);

export default User;