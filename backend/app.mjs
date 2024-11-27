import express from "express";
import middleware from './middleware/index.mjs'
import connectDB from './db/connectDb.mjs'
import routes from './src/v1/routes/index.mjs'
import errorHandler from "./middleware/errorHandler.mjs";

const app = express()

//connect DataBase
connectDB()
//connect middleware
middleware(app)
//connect routes 
app.use("/api/v1", routes);
//handler Errors
errorHandler(app)

export default app;
