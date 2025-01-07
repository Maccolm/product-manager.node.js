import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import loggerConfig from '../config/logger.mjs'
import cors from 'cors'

import passport from "../config/passport.mjs"
import sessionConfig from '../config/session.mjs'
import flash from 'connect-flash'
import { auth } from "./auth.mjs";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the
const __dirname = path.dirname(__filename); // get the name of the directory

const middleware = (app) => {
	app.use(cors())

	auth(app)

	app.set("views", path.join(__dirname, "../views"))
	app.set("view engine", "ejs");

	app.use(loggerConfig)
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }))
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, "../public")))
	app.use('/uploads',express.static(path.join(__dirname, "../uploads")))

	app.get('/uploads/:filename', (req, res, next) => {
		const filePath = path.join(__dirname, 'uploads', req.params.filename);
		res.sendFile(filePath, { headers: { 'Content-Type': 'image/jpeg' } }, (err) => {
		  if (err) {
			 next(err);
		  }
		});
	 });

	app.use(sessionConfig)
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(flash())
}
export default middleware
