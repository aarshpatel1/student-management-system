import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";

function Login() {
	const [loading, setLoading] = useState(false);

	const load = () => {
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	return (
		<>
			<main className="card flex flex-column justify-content-center align-items-center form-height">
				<h1 className="text-center" security="secondary">
					Login
				</h1>

				<form
					action=""
					className="w-3 border-round-lg px-5 py-5 shadow-2"
				>
					<div className="flex flex-column gap-2">
						<label htmlFor="email">Email</label>
						<InputText type="email" id="email" name="email" />
					</div>
					<div className="flex flex-column gap-2 mt-4">
						<label htmlFor="password">Password</label>
						<InputText
							type="password"
							id="password"
							name="password"
							aria-describedby="password-help"
						/>
					</div>
					<Button
						label="Login"
						loading={loading}
						onClick={load}
						className="mt-4"
					/>
				</form>
			</main>
		</>
	);
}

export default Login;
