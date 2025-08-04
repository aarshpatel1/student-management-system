import React, { useRef, useState, useEffect } from "react";
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
import { useParams } from "react-router";

export default function EditUser() {
	const toast = useRef(null);
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});
	const [gender, setGender] = useState("");
	const [role, setRole] = useState("");
	const [selectedCity, setSelectedCity] = useState(null);
	const [profilePhoto, setProfilePhoto] = useState(null);

	const { currentUser, isAuth } = useAuth();
	const { id } = useParams();

	// Load user data on component mount
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await userAPI.getById(id);

				const userData = response.data.user;
				setData({
					firstName: userData.firstName,
					lastName: userData.lastName,
					email: userData.email,
					mobileNumber: userData.mobileNumber,
					address: userData.address,
				});

				setGender(userData.gender);
				setRole(userData.role);
				setSelectedCity({ name: userData.city });

				// Profile photo is handled differently for editing
				// We'll keep the existing one unless user uploads a new one
			} catch (err) {
				console.error("Error fetching user:", err);
				toast.current.show({
					severity: "error",
					summary: "Error",
					detail: "Error loading user data",
					life: 3000,
				});
			}
		};

		fetchUser();
	}, [id]);

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

		// Custom validation for Edit User form
		// Note: we skip password validation on edit unless it's provided
		if (data.password) {
			const validationError = validateUserForm(data, {
				gender,
				role,
				selectedCity,
				profilePhoto: true, // Skip photo validation on edit
				currentUser,
			});

			if (validationError && validationError.field !== "profilePhoto") {
				setValidationErrors(validationError);
				setLoading(false);
				return;
			}
		} else {
			// Custom validation for fields without password
			// This is simplified for example purposes
			if (
				!data.firstName ||
				!data.lastName ||
				!data.email ||
				!data.mobileNumber
			) {
				setValidationErrors({
					field: "firstName",
					errorMessage: "Please fill all required fields.",
				});
				setLoading(false);
				return;
			}
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
			formData.append("address", data.address.trim());
			formData.append("gender", gender);
			formData.append("role", role);
			formData.append("city", selectedCity?.name || "");

			// Only append password if it's provided
			if (data.password) {
				formData.append("password", data.password.trim());
			}

			// Only append profile photo if a new one is selected
			if (profilePhoto) {
				formData.append("profilePhoto", profilePhoto);
			}

			const response = await userAPI.update(id, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			});

			console.log("User updated successfully:", response.data);
			toast.current.show({
				severity: "success",
				summary: "Success",
				detail: "User Updated Successfully",
				life: 3000,
			});
		} catch (err) {
			console.error("Error updating user:", err);

			if (isAxiosError(err)) {
				const res = err.response;

				if (res && res.data) {
					const field = res.data.field;
					const message = res.data.message;

					if (field) {
						setValidationErrors({
							field,
							errorMessage: message || "Error updating user.",
						});
					} else {
						toast.current.show({
							severity: "error",
							summary: "Error",
							detail: message || "Error updating user.",
							life: 3000,
						});
					}
				} else {
					toast.current.show({
						severity: "error",
						summary: "Error",
						detail: "Error updating user.",
						life: 3000,
					});
				}
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Toast ref={toast} />
			<h2>Edit User</h2>
			<form onSubmit={handleSubmit}>
				<div className="p-field">
					<label htmlFor="firstName">First Name</label>
					<InputText
						id="firstName"
						name="firstName"
						value={data.firstName}
						onChange={handleChange}
						required
					/>
					{validationErrors.field === "firstName" && (
						<Message
							severity="error"
							text={validationErrors.errorMessage}
						/>
					)}
				</div>

				<div className="p-field">
					<label htmlFor="lastName">Last Name</label>
					<InputText
						id="lastName"
						name="lastName"
						value={data.lastName}
						onChange={handleChange}
						required
					/>
					{validationErrors.field === "lastName" && (
						<Message
							severity="error"
							text={validationErrors.errorMessage}
						/>
					)}
				</div>

				<div className="p-field">
					<label htmlFor="email">Email</label>
					<InputText
						id="email"
						name="email"
						value={data.email}
						onChange={handleChange}
						required
					/>
					{validationErrors.field === "email" && (
						<Message
							severity="error"
							text={validationErrors.errorMessage}
						/>
					)}
				</div>

				<div className="p-field">
					<label htmlFor="mobileNumber">Mobile Number</label>
					<InputText
						id="mobileNumber"
						name="mobileNumber"
						value={data.mobileNumber}
						onChange={handleChange}
						required
					/>
					{validationErrors.field === "mobileNumber" && (
						<Message
							severity="error"
							text={validationErrors.errorMessage}
						/>
					)}
				</div>

				<div className="p-field">
					<label htmlFor="address">Address</label>
					<InputText
						id="address"
						name="address"
						value={data.address}
						onChange={handleChange}
						required
					/>
					{validationErrors.field === "address" && (
						<Message
							severity="error"
							text={validationErrors.errorMessage}
						/>
					)}
				</div>

				<div className="p-field">
					<label>Gender</label>
					<div>
						<RadioButton
							inputId="gender1"
							name="gender"
							value="male"
							onChange={(e) => setGender(e.value)}
							checked={gender === "male"}
						/>
						<label htmlFor="gender1">Male</label>
						<RadioButton
							inputId="gender2"
							name="gender"
							value="female"
							onChange={(e) => setGender(e.value)}
							checked={gender === "female"}
						/>
						<label htmlFor="gender2">Female</label>
					</div>
				</div>

				<div className="p-field">
					<label>Role</label>
					<div>
						<RadioButton
							inputId="role1"
							name="role"
							value="admin"
							onChange={(e) => setRole(e.value)}
							checked={role === "admin"}
						/>
						<label htmlFor="role1">Admin</label>
						<RadioButton
							inputId="role2"
							name="role"
							value="user"
							onChange={(e) => setRole(e.value)}
							checked={role === "user"}
						/>
						<label htmlFor="role2">User</label>
					</div>
				</div>

				<div className="p-field">
					<label htmlFor="city">City</label>
					<Dropdown
						id="city"
						value={selectedCity}
						onChange={(e) => setSelectedCity(e.value)}
						options={[]}
						placeholder="Select a city"
					/>
				</div>

				<div className="p-field">
					<label htmlFor="profilePhoto">Profile Photo</label>
					<FileUpload
						id="profilePhoto"
						name="profilePhoto"
						accept="image/*"
						maxFileSize={1000000}
						onUpload={handleFileUpload}
						mode="basic"
						auto
					/>
					{validationErrors.field === "profilePhoto" && (
						<Message
							severity="error"
							text={validationErrors.errorMessage}
						/>
					)}
				</div>

				<div className="p-field">
					<Button
						label="Update User"
						icon="pi pi-check"
						type="submit"
						loading={loading}
					/>
				</div>
			</form>
		</div>
	);
}
