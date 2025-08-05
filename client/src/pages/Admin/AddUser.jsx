import React, { use, useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { useAuth } from "../../contexts/AuthContext";
import { userAPI } from "../../../config/axiosConfig";
import axios, { isAxiosError } from "axios";
import { validateUserForm, stringUtils } from "../../utils/ValidationUtils";

export default function AddUser() {
	const toast = useRef(null);
	const [loading, setLoading] = useState(false);
	const [fetchCities, setFetchCities] = useState([]);
	const [filteredCities, setFilteredCities] = useState([]);

	const [data, setData] = useState({});
	const [gender, setGender] = useState("");

	const [role, setRole] = useState("");
	const [profilePhoto, setProfilePhoto] = useState(null);
	const [profilePreview, setProfilePreview] = useState(null);

	const [validationErrors, setValidationErrors] = useState({});

	const { currentUser, isAuth } = useAuth();

	useEffect(() => {
		const fetchInitialCities = async () => {
			var config = {
				method: "post",
				maxBodyLength: Infinity,
				url: "https://countriesnow.space/api/v0.1/countries/cities",
				headers: {},
				data: {
					country: "India",
				},
			};
			axios(config)
				.then(function (response) {
					setFetchCities(response.data.data);
				})
				.catch(function (error) {
					console.log(error);
				});
		};

		fetchInitialCities();
	}, []);

	const searchCities = (e) => {
		let query = e.query || "";
		if (!query) {
			setFilteredCities([]);
			return;
		}

		const filtered = fetchCities.filter((city) =>
			city.toLowerCase().startsWith(query.toLowerCase())
		);
		setFilteredCities(filtered);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	const handlePhotoChange = (e) => {
		const file = e.target.files[0];
		setProfilePhoto(file);
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => setProfilePreview(reader.result);
			reader.readAsDataURL(file);
		} else {
			setProfilePreview(null);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		// Client-side validation
		const validationError = validateUserForm(data, {
			gender,
			role,
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
				stringUtils.toTitleCase(data.firstName?.trim() || "")
			);
			formData.append(
				"lastName",
				stringUtils.toTitleCase(data.lastName?.trim() || "")
			);
			formData.append("mobileNumber", data.mobileNumber?.trim() || "");
			formData.append("email", data.email?.toLowerCase().trim() || "");
			formData.append("password", data.password?.trim() || "");
			formData.append("address", data.address?.trim() || "");
			formData.append("gender", gender.toLowerCase());
			formData.append("role", role.toLowerCase());
			formData.append("city", data.city || "");

			if (profilePhoto) {
				formData.append("profilePhoto", profilePhoto);
			}

			const response = await axios.post(
				"http://127.0.0.1:8000/api/user/addUser",
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 201) {
				toast.current.show({
					severity: "success",
					summary: "Success",
					detail: "User Added Successfully",
					life: 3000,
				});

				// Reset form properly
				setData({});
				setGender("");
				setRole("");
				setProfilePhoto(null);
				setProfilePreview(null);
				setValidationErrors({});

				// Reset file input by creating a reference and resetting it
				document.getElementById("profilePhoto").value = "";
			}
		} catch (err) {
			console.error("Error creating user:", err);

			if (isAxiosError(err)) {
				const res = err.response;

				if (res && res.data) {
					if (res.data.errors && res.data.errors.length > 0) {
						const firstError = res.data.errors[0];
						setValidationErrors({
							field: firstError.path || firstError.param,
							errorMessage: firstError.msg || "Validation error",
						});
					} else if (res.data.field) {
						setValidationErrors({
							field: res.data.field,
							errorMessage:
								res.data.message || "Error creating user.",
						});
					} else {
						toast.current.show({
							severity: "error",
							summary: "Error",
							detail: res.data.message || "Error creating user.",
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
				<h1 className="text-center">Add User</h1>

				<form
					className="border-round-lg px-5 py-5 shadow-2 w-full sm:w-8 md:w-6 lg:w-4 xl:w-3"
					onSubmit={handleSubmit}
				>
					<div className="flex flex-column gap-2">
						<label htmlFor="firstName">First Name</label>
						<InputText
							type="text"
							id="firstName"
							name="firstName"
							value={data.firstName || ""}
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
					<div className="flex flex-column gap-2 mt-4">
						<label htmlFor="lastName">Last Name</label>
						<InputText
							type="text"
							id="lastName"
							name="lastName"
							value={data.lastName || ""}
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
						{validationErrors.field === "gender" && (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
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
							minLength={10}
							maxLength={10}
							required
						/>
						{validationErrors.field === "mobileNumber" && (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
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
							required
						/>
						{validationErrors.field === "email" && (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
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
							required
						/>
						<small id="password-help" className="text-muted">
							Password must have 8 characters with at least one
							UPPERCASE, lowercase, special character and number
						</small>
						{validationErrors.field === "password" && (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						)}
					</div>
					<div className="flex flex-column gap-2 mt-4">
						<label htmlFor="confirmPassword">
							Confirm Password*
						</label>
						<InputText
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={data.confirmPassword || ""}
							onChange={handleChange}
							required
						/>
						{validationErrors.field === "confirmPassword" && (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
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
							required
						/>
						{validationErrors.field === "address" && (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						)}
					</div>
					<div className="flex flex-column gap-2 mt-4">
						<label htmlFor="city">City</label>
						<AutoComplete
							id="city"
							name="city"
							suggestions={filteredCities}
							completeMethod={searchCities}
							value={data.city || ""}
							onChange={handleChange}
							required
						/>
						{validationErrors.field === "city" && (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
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
						{validationErrors.field === "role" && (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						)}
					</div>
					<div className="flex flex-column gap-2 mt-4">
						<label htmlFor="profilePhoto">Profile Photo</label>
						<input
							type="file"
							name="profilePhoto"
							id="profilePhoto"
							accept="image/*"
							className="p-component p-inputtext"
							onChange={handlePhotoChange}
							required
						/>
						{profilePreview && (
							<img
								src={profilePreview}
								alt="Profile Preview"
								className="mt-2"
								style={{
									width: "100px",
									height: "100px",
									objectFit: "cover",
									borderRadius: "8px",
								}}
							/>
						)}
						{validationErrors.field === "profilePhoto" && (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						)}
					</div>
					<Button
						label="Add User"
						loading={loading}
						className="mt-4 w-full"
						type="submit"
					/>
				</form>
				<Toast ref={toast} position="bottom-right" />
			</main>
		</>
	);
}
