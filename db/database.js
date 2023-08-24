import mongoose from "mongoose";
import dotenv from 'dotenv'
 export const connectDb  = () =>{
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: "SocialMedia",

}).then(()=>{
console.log("Db Connected");
})
.catch((err)=>{
console.log(err);
})
}