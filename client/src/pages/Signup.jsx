import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";

function Signup() {
	const toast = useRef(null);
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
	const lowerCaseRegex = /[a-z]/;
	const upperCaseRegex = /[A-Z]/;
	const numberRegex = /[0-9]/;
	const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; // Adjust as needed

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		console.log(data);

		if (!data.email) {
			setValidationErrors({
				field: "email",
				errorMessage: "Please enter a valid email address.",
			});
			setLoading(false);
			return;
		}

		if (!data.password) {
			setValidationErrors({
				field: "password",
				errorMessage: "Please enter a strong password.",
			});
			setLoading(false);
			return;
		}

		if (!data.confirmPassword) {
			setValidationErrors({
				field: "confirmPassword",
				errorMessage:
					"Please enter the same password as Password field.",
			});
			setLoading(false);
			return;
		}

		if (!emailRegex.test(data.email)) {
			setValidationErrors({
				field: "email",
				errorMessage: "There should be a valid email address.",
			});
			setLoading(false);
			return;
		}

		if (!lowerCaseRegex.test(data.password)) {
			setValidationErrors({
				field: "password",
				errorMessage:
					"There should be a lowercase character in the password.",
			});
			setLoading(false);
			return;
		}

		if (!upperCaseRegex.test(data.password)) {
			setValidationErrors({
				field: "password",
				errorMessage:
					"There should be an UPPERCASE character in the password.",
			});
			setLoading(false);
			return;
		}

		if (!numberRegex.test(data.password)) {
			setValidationErrors({
				field: "password",
				errorMessage:
					"There should be a Number character in the password.",
			});
			setLoading(false);
			return;
		}

		if (!specialCharacterRegex.test(data.password)) {
			setValidationErrors({
				field: "password",
				errorMessage:
					"There should be a Special character in the password.",
			});
			setLoading(false);
			return;
		}

		if (data.password.length < 8) {
			setValidationErrors({
				field: "password",
				errorMessage:
					"There should be atleast 8 characters in the password.",
			});
			setLoading(false);
			return;
		}

		if (data.password !== data.confirmPassword) {
			setValidationErrors({
				field: "confirmPassword",
				errorMessage:
					"Passwor and the Confirm Password should be the same.",
			});
			setLoading(false);
			return;
		}

		setLoading(false);
		setData({});
		setValidationErrors({});

		toast.current.show({
			severity: "success",
			summary: "Success",
			detail: "Signup Successfully",
			life: 3000,
		});
	};

	return (
		<>
			<main className="card flex flex-column justify-content-center align-items-center form-height">
				<h1 className="text-center" security="secondary">
					Signup
				</h1>

				<form
					className="border-round-lg px-5 py-5 shadow-2 w-full sm:w-8 md:w-6 lg:w-4 xl:w-3"
					onSubmit={handleSubmit}
				>
					<div className="flex flex-column gap-2">
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
						<small id="password-help">
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
					<Button label="Signup" loading={loading} className="mt-4" />

					<div className="flex mt-3 justify-content-center">
						Already have an account?
						<a href="/login" className="ml-2 font-bold">
							Login
						</a>
					</div>
				</form>
				<Toast ref={toast} position="bottom-right" />
			</main>
		</>
	);
}

export default Signup;
