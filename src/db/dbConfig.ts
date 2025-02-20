import mongoose from "mongoose";


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection=mongoose.connection;
        connection.on("Connected", ()=>{
            console.log("Connected to db");
        })
        connection.on("error", (error)=>{
            console.log("Error in connecting db", error);
            process.exit();
        })

    } catch (error) {
        console.log("Something went wrong in connecting db", error);
        
    }
}