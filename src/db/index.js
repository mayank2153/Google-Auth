import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Specify the write concern mode
            writeConcern: {
                w: 'majority' // Use 'majority' as the write concern mode
            }
        });
        console.log(`\n MongoDB connected! DB host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDb Connection Error", error);
        process.exit(1);
    }
};

export default connectDb;
