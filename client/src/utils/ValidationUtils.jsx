/**
 * Utility functions for form validation
 */

// Regex patterns for validation
export const validationRegex = {
	mobileNumber: /^[0-9]{10}$/,
	email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
	password: {
		lowerCase: /[a-z]/,
		upperCase: /[A-Z]/,
		number: /[0-9]/,
		specialCharacter: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
	},
};

/**
 * Validate user form data
 * @param {Object} data - Form data to validate
 * @param {Object} options - Additional validation options
 * @returns {Object|null} - Returns error object or null if valid
 */
export const validateUserForm = (data, options = {}) => {
	const {
		firstName,
		lastName,
		mobileNumber,
		email,
		password,
		confirmPassword,
		address,
	} = data;

	const {
		gender,
		role,
		selectedCity,
		profilePhoto,
		currentUser = {},
	} = options;

	// First Name validation
	if (!firstName) {
		return {
			field: "firstName",
			errorMessage: "Please enter your First Name.",
		};
	}

	// Last Name validation
	if (!lastName) {
		return {
			field: "lastName",
			errorMessage: "Please enter your Last Name.",
		};
	}

	// Gender validation
	if (!gender) {
		return {
			field: "gender",
			errorMessage: "Please select your Gender.",
		};
	}

	// Mobile Number validations
	if (!mobileNumber) {
		return {
			field: "mobileNumber",
			errorMessage: "Please enter your Mobile Number.",
		};
	}

	if (!validationRegex.mobileNumber.test(mobileNumber)) {
		return {
			field: "mobileNumber",
			errorMessage: "Mobile Number must be 10 digits.",
		};
	}

	if (mobileNumber.length !== 10) {
		return {
			field: "mobileNumber",
			errorMessage: "Mobile Number must be 10 digits.",
		};
	}

	// Address validation
	if (!address) {
		return {
			field: "address",
			errorMessage: "Please enter your Address.",
		};
	}

	// City validation
	if (!city) {
		return {
			field: "city",
			errorMessage: "Please select your City.",
		};
	}

	// Role validations
	if (!role) {
		return {
			field: "role",
			errorMessage: "Please select your Role.",
		};
	}

	if (currentUser.role !== "admin" && role === "Admin") {
		return {
			field: "role",
			errorMessage: "You are not allowed to create an Admin user.",
		};
	}

	if (currentUser.role !== "admin" && role === "Faculty") {
		return {
			field: "role",
			errorMessage: "You are not allowed to create a Faculty user.",
		};
	}

	if (currentUser.role !== "admin" && role === "Student") {
		return {
			field: "role",
			errorMessage: "You are not allowed to create a Student user.",
		};
	}

	// Email validation
	if (!email) {
		return {
			field: "email",
			errorMessage: "Please enter a valid email address.",
		};
	}

	if (!validationRegex.email.test(email)) {
		return {
			field: "email",
			errorMessage: "There should be a valid email address.",
		};
	}

	// Password validations
	if (!password) {
		return {
			field: "password",
			errorMessage: "Please enter a strong password.",
		};
	}

	if (!validationRegex.password.lowerCase.test(password)) {
		return {
			field: "password",
			errorMessage:
				"There should be a lowercase character in the password.",
		};
	}

	if (!validationRegex.password.upperCase.test(password)) {
		return {
			field: "password",
			errorMessage:
				"There should be an UPPERCASE character in the password.",
		};
	}

	if (!validationRegex.password.number.test(password)) {
		return {
			field: "password",
			errorMessage: "There should be a Number character in the password.",
		};
	}

	if (!validationRegex.password.specialCharacter.test(password)) {
		return {
			field: "password",
			errorMessage:
				"There should be a Special character in the password.",
		};
	}

	if (password.length < 8) {
		return {
			field: "password",
			errorMessage:
				"There should be atleast 8 characters in the password.",
		};
	}

	// Confirm Password validation
	if (!confirmPassword) {
		return {
			field: "confirmPassword",
			errorMessage: "Please enter the same password as Password field.",
		};
	}

	if (password !== confirmPassword) {
		return {
			field: "confirmPassword",
			errorMessage:
				"Password and the Confirm Password should be the same.",
		};
	}

	// Profile Photo validation
	if (!profilePhoto) {
		return {
			field: "profilePhoto",
			errorMessage: "Please upload a profile photo.",
		};
	}

	// If we made it here, the form is valid
	return null;
};

/**
 * Validate login form data
 * @param {Object} data - Login form data
 * @returns {Object|null} - Returns error object or null if valid
 */
export const validateLoginForm = (data) => {
	const { email, password } = data;

	if (!email) {
		return {
			field: "email",
			errorMessage: "Please enter your email.",
		};
	}

	if (!validationRegex.email.test(email)) {
		return {
			field: "email",
			errorMessage: "Please enter a valid email address.",
		};
	}

	if (!password) {
		return {
			field: "password",
			errorMessage: "Please enter your password.",
		};
	}

	return null;
};

/**
 * String utility functions
 */
export const stringUtils = {
	/**
	 * Convert string to title case
	 * @param {string} str - String to convert
	 * @returns {string} - Title case string
	 */
	toTitleCase: (str) => {
		if (!str) return "";
		return str.charAt(0).toUpperCase() + str.slice(1);
	},

	/**
	 * Trim and normalize a string
	 * @param {string} str - String to normalize
	 * @returns {string} - Normalized string
	 */
	normalizeString: (str) => {
		if (!str) return "";
		return str.trim();
	},
};
