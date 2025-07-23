import cloudinary from "../config/cloudinary.js";
import { handleApiError } from "../utils/errorHandler.js";
import Users from "../models/User.js";
import bcrypt from "bcrypt";

const salt = 10;

export const getAllUsers = async (req, res) => {
	const search = req.query.search?.toString() || "";

	const sortField = [
		"firstName",
		"lastName",
		"gender",
		"createdAt",
		"updatedAt",
	].includes(req.query.sortField)
		? req.query.sortField
		: "createdAt";
	const sortDirection = req.query.sortDirection === "desc" ? -1 : 1;
	const sortOptions = {};
	sortOptions[sortField] = sortDirection;

	try {
		const query = search
			? {
					$or: [
						{ firstName: { $regex: new RegExp(search, "i") } },
						{ lastName: { $regex: new RegExp(search, "i") } },
						{ gender: { $regex: new RegExp(search, "i") } },
						{ mobileNumber: { $regex: new RegExp(search, "i") } },
						{ email: { $regex: new RegExp(search, "i") } },
						{ address: { $regex: new RegExp(search, "i") } },
						{ city: { $regex: new RegExp(search, "i") } },
						{ role: { $regex: new RegExp(search, "i") } },
					],
			  }
			: {};

		const allUsers = await Users.find(query)
			.select("-password")
			.sort(sortOptions);

		return res.status(200).json({
			status: "success",
			message: "Retrieved users data successfully",
			allUsers,
			filters: {
				search,
				sortField,
				sortDirection: sortDirection === -1 ? "desc" : "asc",
			},
		});
	} catch (err) {
		return handleApiError(res, err, "Failed to get users data");
	}
};

export const getUser = async (req, res) => {
	try {
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			return res.status(400).json({
				status: "error",
				message: "Invalid User ID format",
			});
		}

		const user = await Users.findById(req.params.id).select("-password");

		if (!user) {
			return res.status(404).json({
				status: "not found",
				message: "User not found",
			});
		}

		return res.status(200).json({
			status: "success",
			message: "User found successfully",
			user,
		});
	} catch (err) {
		return handleApiError(res, err, "Failded to find user");
	}
};

export const addUser = async (req, res) => {
	try {
		let checkUser = await Users.findOne({ email: req.body.email });

		if (checkUser) {
			return res.status(409).json({
				status: "error",
				message: "User already exists..!",
			});
		}

		if (!req.file || !req.file.path) {
			return res.status(400).json({
				status: "error",
				message: "Profile photo is required.",
			});
		}

		req.body.profilePhoto = {
			url: req.file.path,
			public_id: req.file.filename,
		};

		if (req.body.password) {
			req.body.password = await bcrypt.hash(req.body.password, salt);
		}

		const user = await Users.create(req.body);
		const userResponse = user.toObject();
		delete userResponse.password;

		return res.status(201).json({
			status: "success",
			message: "User added successfully",
			user: userResponse,
		});
	} catch (err) {
		return handleApiError(res, err, "Failed to add user");
	}
};

export const updateUser = async (req, res) => {};

export const deleteUser = async (req, res) => {};
