import Users from "../models/User.js";

import { config } from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

config({
	path: "./.env",
	quiet: true,
});

const saltRounds = 10;

export const signup = async (req, res) => {};

export const login = async (req, res) => {
	console.log(req.body);
	return res.status(200).json({
		status: "success",
		message: "Logged in succesfully",
	});
};
