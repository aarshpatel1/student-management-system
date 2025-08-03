// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
	const { isAuth, loading } = useAuth();

	// Show loading indicator while checking authentication
	if (loading) {
		return (
			<div>
				<i
					className="pi pi-spin pi-spinner"
					style={{ fontSize: "2rem" }}
				></i>
			</div>
		);
	}

	return isAuth ? children : <Navigate to="/login" replace />;
}
