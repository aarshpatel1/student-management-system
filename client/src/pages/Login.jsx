import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router";
import { authAPI } from "../../config/axiosConfig";
import { isAxiosError } from "axios";

function Login() {
	const toast = useRef(null);
	const [credentials, setCredentials] = useState({});
	const [loading, setLoading] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});

	const navigate = useNavigate();
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		// Basic validations
		if (!credentials.email) {
			setValidationErrors({
				field: "email",
				errorMessage: "Please enter your email address.",
			});
			setLoading(false);
			return;
		}

		if (!emailRegex.test(credentials.email)) {
			setValidationErrors({
				field: "email",
				errorMessage: "Please enter a valid email.",
			});
			setLoading(false);
			return;
		}

		if (!credentials.password) {
			setValidationErrors({
				field: "password",
				errorMessage: "Please enter your password.",
			});
			setLoading(false);
			return;
		}

		try {
			const response = await authAPI.login(credentials);

			// ✅ Assuming your API returns token in response.data.token
			const { token } = response.data;

			localStorage.setItem("token", token);

			toast.current.show({
				severity: "success",
				summary: "Success",
				detail: "Login Successfully",
				life: 3000,
			});

			// ✅ Redirect after successful login
			navigate("/dashboard");

			// ✅ Clear errors and form state AFTER success
			setCredentials({});
			setValidationErrors({});
		} catch (err) {
			console.error("Login failed:", err);

			if (isAxiosError(err)) {
				const res = err.response;

				// ✅ Check if backend sent 'field' and 'message'
				if (res && res.data) {
					const field = res.data.field;
					const message = res.data.message;

					// ✅ Handle known fields
					if (field === "email" || field === "password") {
						setValidationErrors({
							field,
							errorMessage: message || "Invalid credentials.",
						});
					} else {
						// ✅ Unknown error field or general message
						toast.current.show({
							severity: "error",
							summary: "Login Error",
							detail:
								message ||
								"Something went wrong. Please try again.",
							life: 3000,
						});
					}
				} else {
					// ✅ Network or server-side error without response
					toast.current.show({
						severity: "error",
						summary: "Server Error",
						detail: "Unable to connect to server.",
						life: 3000,
					});
				}
			}
		} finally {
			setLoading(false); // ✅ Always stop loading regardless of outcome
		}
	};

	return (
		<>
			<main className="card flex flex-column justify-content-center align-items-center form-height">
				<h1 className="text-center" security="secondary">
					Login
				</h1>

				<form
					className="w-4 border-round-lg px-5 py-5 shadow-2"
					onSubmit={handleSubmit}
				>
					<div className="flex flex-column gap-2">
						<label htmlFor="email">Email</label>
						<InputText
							type="email"
							id="email"
							name="email"
							value={credentials.email || ""}
							onChange={handleChange}
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
							value={credentials.password || ""}
							onChange={handleChange}
						/>
						{validationErrors.field === "password" && (
							<Message
								severity="error"
								text={validationErrors.errorMessage}
							/>
						)}
					</div>

					<Button
						label="Login" // ✅ fixed label
						loading={loading}
						className="mt-4"
					/>
				</form>

				<Toast ref={toast} position="bottom-right" />
			</main>
		</>
	);
}

export default Login;
