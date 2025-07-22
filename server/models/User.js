import cloudinary from "../config/cloudinary";

import mongoose from "mongoose";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import sharp from "sharp";

const userSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			trim: true,
			minlength: 2,
			maxlength: 50,
			required: true,
		},
		lastName: {
			type: String,
			trim: true,
			minlength: 2,
			maxlength: 50,
			required: true,
		},
		gender: {
			type: String,
			enum: ["male", "female", "other"],
			required: true,
		},
		mobileNumber: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please fill a valid email address",
			],
			required: true,
		},
		password: {
			type: String,
			minlength: 8,
			required: true,
		},
		address: {
			type: String,
			trim: true,
			required: true,
		},
		city: {
			type: String,
			trim: true,
			required: true,
		},
		role: {
			type: String,
			enum: ["admin", "faculty", "student"],
			required: true,
		},
		status: {
			type: Boolean,
			default: true,
			required: true,
		},
		profilePhoto: {
			type: Object,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: async (req, file) => {
		return {
			folder: "Students",
			format: "jpg",
			transformation: [
				{
					with: 400,
					height: 400,
					crop: "limit",
				},
				{
					quality: "auto:good",
				},
			],
		};
	},
});

const uploadStudentProfilePhoto = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith("image/")) {
			cb(null, true);
		} else {
			cb(new Error("Only image files are allowed"), false);
		}
	},
	limits: {
		fileSize: 1024 * 1024 * 2,
	},
}).single("profilePhoto");

export const compressAndUpload = (req, res, next) => {
	if (!req.file) return next();
	const buffer = req.file.buffer;
	sharp(buffer)
		.resize(400, 400, {
			fit: "inside",
		})
		.jpeg({
			quality: 80,
		})
		.toBuffer()
		.then((data) => {
			req.file.buffer = data;
			next();
		})
		.catch((err) => next(err));
};

userSchema.statics.uploadStudentProfilePhoto = uploadStudentProfilePhoto;

const Users = mongoose.model("User", userSchema);

export default Users;
