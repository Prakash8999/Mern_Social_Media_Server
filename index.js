import express from "express";
import bodyParser from "body-parser";
import { connectDb } from "./db/database.js";
import routes from "./routes/route.js";
import userDetailRoutes from "./routes/userRoute.js"
import postRoutes from "./routes/post.js"
import cors from 'cors'
import helmet from 'helmet'
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv'
import multer from "multer";

// Configuration 
const app = express()
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true,          

}))
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
app.use(express.json())
app.use('/auth', routes)
app.use('/user', userDetailRoutes)
app.use('/post', postRoutes)
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

const port = 5000;
connectDb()




app.listen(port, () => {
	console.log("Connected to server");
})