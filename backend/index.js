import path from "path";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Middleware__and_Routes/authen.routes.js";
import connectToMongoDB from "./database/connectdb.js";
import messageRoutes from "./Middleware__and_Routes/message.routes.js";
import userRoutes from "./Middleware__and_Routes/user.routes.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import {app, server} from "./socket/socket.js";


dotenv.config() 
// const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


// app.get("/", (req, res) =>{ 
//     res.send("Hello World!");
// })
app.use("/authen", authRoutes);
app.use("/message", messageRoutes);
app.use("/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
})