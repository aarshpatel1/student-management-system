import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";

function Login() {
	const toast = useRef(null);
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		console.log(data);

		if (!data.email) {
			setValidationErrors({
				field: "email",
				errorMessage: "Please enter your email address.",
			});
			setLoading(false);
			return;
		}

		if (!data.password) {
			setValidationErrors({
				field: "password",
				errorMessage: "Please enter a correct password.",
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
			detail: "Login Successfully",
			life: 3000,
		});
	};

	return (
		<>
			<main className="card flex flex-column justify-content-center align-items-center form-height">
				<h1 className="text-center" security="secondary">
					Login
				</h1>

				<form
					action=""
					className="w-4 border-round-lg px-5 py-5 shadow-2"
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
						{validationErrors.field === "password" ? (
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

export default Login;
