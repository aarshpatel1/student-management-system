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
			} catch (e) {
				console.error(
					"Failed to delete Cloudinary image after validation error:",
					e.message
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
					.isLength({ min: 2, max: 50 })
					.withMessage(
						"First name must be between 2 and 50 characters"
					),

				body("lastName")
					.trim()
					.notEmpty()
					.withMessage("Last name is required")
					.isLength({ min: 2, max: 50 })
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

				handleValidationErrors,
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
					.isIn(["male", "female", "other"])
					.withMessage("Gender must be male, female, or other"),

				body("mobileNumber")
					.optional()
					.trim()
					.isMobilePhone("any")
					.withMessage("Invalid mobile number format"),

				body("email")
					.optional()
					.trim()
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

				body("address").optional().trim(),

				body("city").optional().trim(),

				body("role")
					.optional()
					.isIn(["student", "faculty", "admin"])
					.withMessage("Role must be student, faculty, or admin"),

				handleValidationErrors,
			];
		}

		default:
			return [];
	}
};

export const validateGetAllUsersQuery = [
	query("page")
		.optional()
		.isInt({ min: 0 })
		.withMessage("Page must be a non-negative integer"),
	query("recordsPerPage")
		.optional()
		.isInt({ min: 1, max: 100 })
		.withMessage("Records per page must be between 1 and 100"),
	query("sortDirection")
		.optional()
		.isIn(["asc", "desc"])
		.withMessage("Sort direction must be either asc or desc"),
	handleValidationErrors,
];
