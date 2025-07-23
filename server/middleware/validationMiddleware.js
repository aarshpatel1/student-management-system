import cloudinary from "../config/cloudinary.js";

import { body, param, query, validationResult } from "express-validator";

// Helper function to check validation results
const handleValidationErrors = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// If an image was uploaded, delete it from Cloudinary
		if (req.file && req.file.filename) {
			// For multer-storage-cloudinary, the public_id is in req.file.filename (or req.file.public_id)
			try {
				await cloudinary.uploader.destroy(req.file.filename);
			} catch (err) {
				console.error(
					"Failed to delete Cloudinary image after validation error:",
					err.message
				);
			}
		}
		return res.status(400).json({
			status: "error",
			message: "Validation failed",
			errors: errors.array(),
		});
	}
	next();
};

export const validateUser = (method) => {
	switch (method) {
		case "create": {
			return [
				body("firstName")
					.trim()
					.notEmpty()
					.withMessage("First name is required")
					.isLength({
						min: 2,
						max: 50,
					})
					.withMessage(
						"First name must be between 2 and 50 characters"
					),

				body("lastName")
					.trim()
					.notEmpty()
					.withMessage("Last name is required")
					.isLength({
						min: 2,
						max: 50,
					})
					.withMessage(
						"Last name must be between 2 and 50 characters"
					),

				body("gender")
					.notEmpty()
					.withMessage("Gender is required")
					.isIn(["male", "female", "other"])
					.withMessage("Gender must be male, female, or other"),

				body("mobileNumber")
					.trim()
					.notEmpty()
					.withMessage("Mobile number is required")
					.isMobilePhone("any")
					.withMessage("Invalid mobile number format"),

				body("email")
					.trim()
					.notEmpty()
					.withMessage("Email is required")
					.isEmail()
					.withMessage("Invalid email format")
					.normalizeEmail(),

				body("password")
					.notEmpty()
					.withMessage("Password is required")
					.isLength({ min: 8 })
					.withMessage("Password must be at least 8 characters")
					.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
					.withMessage(
						"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
					),

				body("address")
					.trim()
					.notEmpty()
					.withMessage("Address is required"),

				body("city").trim().notEmpty().withMessage("City is required"),

				body("role")
					.notEmpty()
					.withMessage("Role is required")
					.isIn(["student", "faculty", "admin"])
					.withMessage("Role must be student, faculty, or admin"),
			];
		}

		case "update": {
			return [
				body("firstName")
					.optional()
					.trim()
					.isLength({ min: 2, max: 50 })
					.withMessage(
						"First name must be between 2 and 50 characters"
					),

				body("lastName")
					.optional()
					.trim()
					.isLength({ min: 2, max: 50 })
					.withMessage(
						"Last name must be between 2 and 50 characters"
					),

				body("gender")
					.optional()
					.notEmpty()
					.withMessage("Gender is required")
					.isIn(["male", "female", "other"])
					.withMessage("Gender must be male, female, or other"),

				body("mobileNumber")
					.optional()
					.trim()
					.notEmpty()
					.withMessage("Mobile number is required")
					.isMobilePhone("any")
					.withMessage("Invalid mobile number format"),

				body("email")
					.optional()
					.trim()
					.notEmpty()
					.withMessage("Email is required")
					.isEmail()
					.withMessage("Invalid email format")
					.normalizeEmail(),

				body("password")
					.optional()
					.isLength({ min: 8 })
					.withMessage("Password must be at least 8 characters")
					.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
					.withMessage(
						"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
					),

				body("address")
					.optional()
					.trim()
					.notEmpty()
					.withMessage("Address is required"),

				body("city")
					.optional()
					.trim()
					.notEmpty()
					.withMessage("City is required"),

				body("role")
					.optional()
					.notEmpty()
					.withMessage("Role is required")
					.isIn(["student", "faculty", "admin"])
					.withMessage("Role must be student, faculty, or admin"),
			];
		}

		default:
			return [];
	}
};
