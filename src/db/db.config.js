import mongoose from 'mongoose';

const connectDB = async ()=>{
    try {
        const instance = await mongoose.connect(process.env.URL);
        if(instance){
            console.log("Database connected successfully");
        }
        
    } catch (error) {
        console.log('MongoDB connection error')
        console.log(error)
    }
}
export default connectDB;