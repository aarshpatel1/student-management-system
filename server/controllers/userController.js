import cloudinary from "../config/cloudinary.js";
import { handleApiError } from "../utils/errorHandler.js";
import Users from "../models/User.js";
import bcrypt from "bcrypt";

const salt = 10;

export const getAllUsers = async (req, res) => {
	// search
	const search = req.query.search?.toString() || "";

	// sorting
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

	// pagination
	const currentPage = Math.max(0, parseInt(req.query.page) || 0);
	const recordsPerPage = Math.min(
		100,
		Math.max(1, parseInt(req.query.recordsPerPage) || 5)
	);

	try {
		// search query
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

		const totalUsers = await Users.countDocuments(query);
		const totalPages = Math.ceil(totalUsers / recordsPerPage);

		if (totalUsers === 0) {
			return res.status(200).json({
				status: "success",
				message: "No users found matching your criteria",
				allUsers: [],
				pagination: {
					recordsPerPage,
					recordsOnThisPage: 0,
					currentPage,
					totalPages: 0,
					totalRecords: 0,
					hasNextPage: false,
					hasPrevPage: false,
				},
			});
		}

		if (totalUsers > 0 && currentPage >= totalPages) {
			return res.status(400).json({
				status: "error",
				message: "Page number out of range",
				totalPages: totalPages > 0 ? totalPages - 1 : 0,
			});
		}

		// final query
		const allUsers = await Users.find(query)
			.select("-password")
			.sort(sortOptions)
			.skip(currentPage * recordsPerPage)
			.limit(recordsPerPage);

		return res.status(200).json({
			status: "success",
			message: "Retrieved users data successfully",
			allUsers,
			pagination: {
				recordsPerPage,
				recordsOnThisPage: allUsers.length,
				currentPage,
				totalPages: totalPages > 0 ? totalPages - 1 : 0,
				totalRecords: totalUsers,
				hasNextPage: currentPage < totalPages - 1,
				hasPrevPage: currentPage > 0,
			},
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

export const allUsers = async (req, res) => {
	try {
		const allUsers = await Users.find({}).select("-password");
		if (allUsers.length === 0) {
			return res.status(404).json({
				status: "not found",
				message: "No users found",
			});
		}
		return res.status(200).json({
			status: "success",
			message: "All users retrieved successfully",
			data: allUsers,
		});
	} catch (err) {
		return handleApiError(res, err, "Failed to retrieve all users");
	}
};

export const getUser = async (req, res) => {
	try {
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			return res.status(400).json({
				status: "error",
				message: "Invalid user ID format",
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
		console.log("Request body:", req.body);
		console.log("Request file:", req.file);
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

export const updateUser = async (req, res) => {
	try {
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			return res.status(400).json({
				status: "error",
				message: "Invalid user ID format",
			});
		}

		const user = await Users.findById(req.params.id);

		if (!user) {
			return res.status(404).json({
				status: "not found",
				message: "User not found",
			});
		}

		if (req.file && req.file.path) {
			if (user.profilePhoto && user.profilePhoto.public_id) {
				try {
					await cloudinary.uploader.destroy(
						user.profilePhoto.public_id
					);
				} catch (err) {
					console.error(
						"Falided to delete Cloudinary image:",
						err.message
					);
				}
			}

			req.body.profilePhoto = {
				url: req.file.path,
				public_id: req.file.filename,
			};
		}

		const updatedUser = await Users.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		).select("-password");

		return res.status(200).json({
			status: "success",
			message: "User updated successfully",
			user: updatedUser,
		});
	} catch (err) {
		return handleApiError(res, err, "Failed to update user");
	}
};

export const deleteUser = async (req, res) => {
	try {
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			return res.status(400).json({
				status: "error",
				message: "Invalid user ID format",
			});
		}

		const user = await Users.findById(req.params.id);

		if (!user) {
			return res.status(404).json({
				status: "not found",
				message: "User not found",
			});
		}

		if (user.profilePhoto && user.profilePhoto.public_id) {
			try {
				await cloudinary.uploader.destroy(user.profilePhoto.public_id);
			} catch (err) {
				console.error(
					"Falided to delete Cloudinary image:",
					err.message
				);
			}
		}

		const deleteUser = await Users.findByIdAndDelete(req.params.id);

		const userResponse = deleteUser.toObject();
		delete userResponse.password;

		return res.status(200).json({
			status: "success",
			message: "User deleted successfully",
			user: userResponse,
		});
	} catch (err) {
		return handleApiError(res, err, "Failed to delete user");
	}
};

export const failedLogin = (req, res) => {
	return res.status(401).json({
		status: "Unauthorized",
		message: "Login Failed. Please try again with valid credentials.",
	});
};
