import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODBURL);
        console.log('Database connected successfully')

    } catch (error) {
        console.log(error);
    }
}