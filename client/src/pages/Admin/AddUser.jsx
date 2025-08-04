import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { useAuth } from "../../contexts/AuthContext";
import { userAPI } from "../../../config/axiosConfig";
import axios, { isAxiosError } from "axios";
import { validateUserForm, stringUtils } from "../../utils/ValidationUtils";

export default function AddUser() {
	const toast = useRef(null);
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});
	const [gender, setGender] = useState("");
	const [role, setRole] = useState("");
	const [selectedCity, setSelectedCity] = useState(null);
	const [profilePhoto, setProfilePhoto] = useState(null);

	const { currentUser, isAuth } = useAuth();

	const cities = [
		{ name: "New York", code: "NY" },
		{ name: "Rome", code: "RM" },
		{ name: "London", code: "LDN" },
		{ name: "Istanbul", code: "IST" },
		{ name: "Paris", code: "PRS" },
	];

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	const handleFileUpload = (e) => {
		if (e.files && e.files.length > 0) {
			setProfilePhoto(e.files[0]);
			if (validationErrors.field === "profilePhoto") {
				setValidationErrors({});
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		console.log(data);

		// Use the validation utility
		const validationError = validateUserForm(data, {
			gender,
			role,
			selectedCity,
			profilePhoto,
			currentUser,
		});

		if (validationError) {
			setValidationErrors(validationError);
			setLoading(false);
			return;
		}

		try {
			const token = localStorage.getItem("token");

			const formData = new FormData();
			formData.append(
				"firstName",
				stringUtils.toTitleCase(data.firstName.trim())
			);
			formData.append(
				"lastName",
				stringUtils.toTitleCase(data.lastName.trim())
			);
			formData.append("mobileNumber", data.mobileNumber.trim());
			formData.append("email", data.email.toLowerCase().trim());
			formData.append("password", data.password.trim());
			formData.append("address", data.address.trim());
			formData.append("gender", gender);
			formData.append("role", role);
			formData.append("city", selectedCity?.name || "");
			formData.append("profilePhoto", profilePhoto);

			console.log("Sending form data...");

			const response = await userAPI.create(formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			});

			console.log("User created successfully:", response.data);
			toast.current.show({
				severity: "success",
				summary: "Success",
				detail: "User Added Successfully",
				life: 3000,
			});

			// Reset form
			setData({});
			setGender("");
			setRole("");
			setSelectedCity(null);
			setProfilePhoto(null);
			setValidationErrors({});
		} catch (err) {
			console.error("Error creating user:", err);

			if (isAxiosError(err)) {
				const res = err.response;

				if (res && res.data) {
					const field = res.data.field;
					const message = res.data.message;

					if (field) {
						setValidationErrors({
							field,
							errorMessage: message || "Error creating user.",
						});
					} else {
						toast.current.show({
							severity: "error",
							summary: "Error",
							detail: message || "Error creating user.",
							life: 3000,
						});
					}
				} else {
					toast.current.show({
						severity: "error",
						summary: "Error",
						detail: "Error creating user.",
						life: 3000,
					});
				}
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<main className="card flex flex-column justify-content-center align-items-center mb-6">
				<h1 className="text-center" security="secondary">
					Add User
				</h1>

				<form
					className="border-round-lg px-5 py-5 shadow-2 w-full sm:w-8 md:w-6 lg:w-4 xl:w-3"
					onSubmit={handleSubmit}
					encType="multipart/form-data"
				>
					<div className="flex flex-column gap-2">
						<label htmlFor="firstName">First Name</label>
						<InputText
							type="text"
							id="firstName"
							name="firstName"
							value={data.firstName || ""}
							onChange={handleChange}
						/>
						{validationErrors.field === "firstName" ? (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						) : (
							""
						)}
					</div>
					<div className="flex flex-column gap-2 mt-4">
						<label htmlFor="lastName">Last Name</label>
						<InputText
							type="text"
							id="lastName"
							name="lastName"
							value={data.lastName || ""}
							onChange={handleChange}
						/>
						{validationErrors.field === "lastName" ? (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						) : (
							""
						)}
					</div>
					<div className="flex flex-column gap-2 mt-4">
						<label htmlFor="gender">Gender</label>
						<div className="flex flex-wrap gap-3">
							<div className="flex align-items-center">
								<RadioButton
									inputId="gender1"
									name="gender"
									value="Male"
									onChange={(e) => setGender(e.value)}
									checked={gender === "Male"}
								/>
								<label htmlFor="gender1" className="ml-2">
									Male
								</label>
							</div>
							<div className="flex align-items-center">
								<RadioButton
									inputId="gender2"
									name="gender"
									value="Female"
									onChange={(e) => setGender(e.value)}
									checked={gender === "Female"}
								/>
								<label htmlFor="gender2" className="ml-2">
									Female
								</label>
							</div>
							<div className="flex align-items-center">
								<RadioButton
									inputId="gender3"
									name="gender"
									value="Other"
									onChange={(e) => setGender(e.value)}
									checked={gender === "Other"}
								/>
								<label htmlFor="gender3" className="ml-2">
									Other
								</label>
							</div>
						</div>
						{validationErrors.field === "gender" ? (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						) : (
							""
						)}
					</div>
					<div className="flex flex-column gap-2 mt-4">
						<label htmlFor="mobileNumber">Mobile Number</label>
						<InputText
							keyfilter="pint"
							id="mobileNumber"
							name="mobileNumber"
							value={data.mobileNumber || ""}
							onChange={handleChange}
							maxLength={10}
						/>
						{validationErrors.field === "mobileNumber" ? (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						) : (
							""
						)}
					</div>
					<div className="flex flex-column gap-2 mt-4">
						<label htmlFor="email">Email</label>
						<InputText
							type="email"
							id="email"
							name="email"
							value={data.email || ""}
							onChange={handleChange}
						/>
						{validationErrors.field === "email" ? (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						) : (
							""
						)}
					</div>
					<div className="flex flex-column gap-2 mt-4">
						<label htmlFor="password">Password</label>
						<InputText
							type="password"
							id="password"
							name="password"
							value={data.password || ""}
							aria-describedby="password-help"
							onChange={handleChange}
						/>
						<small id="password-help" className="text-muted">
							Password must have 8 characters with atleast one
							UPPERCASE, lowercase, Special Character and Number
						</small>
						{validationErrors.field === "password" ? (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						) : (
							""
						)}
					</div>
					<div className="flex flex-column gap-2 mt-4">
						<label htmlFor="confirmPassword">
							Confirm Password
						</label>
						<InputText
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={data.confirmPassword || ""}
							onChange={handleChange}
						/>
						{validationErrors.field === "confirmPassword" ? (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						) : (
							""
						)}
					</div>
					<div className="flex flex-column gap-2 mt-4">
						<label htmlFor="address">Address</label>
						<InputText
							type="text"
							id="address"
							name="address"
							value={data.address || ""}
							onChange={handleChange}
						/>
						{validationErrors.field === "address" ? (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						) : (
							""
						)}
					</div>
					<div className="flex flex-column gap-2 mt-4">
						<label htmlFor="city">City</label>
						<Dropdown
							value={selectedCity}
							onChange={(e) => setSelectedCity(e.value)}
							options={cities}
							optionLabel="name"
							editable
							placeholder="Select a City"
						/>
						{validationErrors.field === "city" ? (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						) : (
							""
						)}
					</div>
					<div className="flex flex-column gap-2 mt-4">
						<label htmlFor="role">Role</label>
						<div className="flex flex-wrap gap-3">
							{isAuth && currentUser.role === "admin" && (
								<div className="flex align-items-center">
									<RadioButton
										inputId="role1"
										name="role"
										value="Admin"
										onChange={(e) => setRole(e.value)}
										checked={role === "Admin"}
									/>
									<label htmlFor="role1" className="ml-2">
										Admin
									</label>
								</div>
							)}
							<div className="flex align-items-center">
								<RadioButton
									inputId="role2"
									name="role"
									value="Faculty"
									onChange={(e) => setRole(e.value)}
									checked={role === "Faculty"}
								/>
								<label htmlFor="role2" className="ml-2">
									Faculty
								</label>
							</div>
							<div className="flex align-items-center">
								<RadioButton
									inputId="role3"
									name="role"
									value="Student"
									onChange={(e) => setRole(e.value)}
									checked={role === "Student"}
								/>
								<label htmlFor="role3" className="ml-2">
									Student
								</label>
							</div>
						</div>
						{validationErrors.field === "role" ? (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						) : (
							""
						)}
					</div>
					<div className="flex flex-column gap-2 mt-4">
						<label htmlFor="profilePhoto">Profile Photo</label>
						<FileUpload
							mode="basic"
							name="profilePhoto"
							accept="image/*"
							maxFileSize={1000000}
							onSelect={handleFileUpload}
							auto={false}
							chooseLabel="Choose Photo"
						/>
						{validationErrors.field === "profilePhoto" ? (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						) : (
							""
						)}
					</div>
					<Button label="Signup" loading={loading} className="mt-4" />
				</form>
				<Toast ref={toast} position="bottom-right" />
			</main>
		</>
	);
}
