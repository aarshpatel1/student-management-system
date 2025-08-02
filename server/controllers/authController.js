import Users from "../models/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config({
	path: "./.env",
	quiet: true,
});

const saltRounds = 10;

const generateToken = (userId) => {
	return jwt.sign(
		{
			id: userId,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRY || "1h",
		}
	);
};

export const signup = async (req, res) => {};

export const login = async (req, res) => {
	// console.log("Login Route" + req.body);

	const { email, password } = req.body;

	try {
		const user = await Users.findOne({ email });

		if (!user) {
			return res.status(401).json({
				status: "Unauthenticated",
				field: "email",
				message: "Invalid Email",
			});
		}

		const matchPassword = await bcrypt.compare(password, user.password);
		if (!matchPassword) {
			return res.status(401).json({
				status: "Unauthenticated",
				field: "password",
				message: "Invalid Password",
			});
		}

		const token = generateToken(user._id);

		return res.status(200).json({
			message: "User logged in successfully",
			status: "success",
			user: {
				id: user._id,
				name: user.name,
			},
			token,
		});
	} catch (err) {
		console.error("Login error:", err);
		res.status(500).json({
			status: "error",
			message: "Server error",
		});
	}
};
