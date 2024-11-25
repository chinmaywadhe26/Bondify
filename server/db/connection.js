import mongoose from 'mongoose'
export const connectDb = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if(connection.STATES.connected) console.log("Database connected");
    if(connection.STATES.disconnected) console.log("error while connecting database");
    return;
}