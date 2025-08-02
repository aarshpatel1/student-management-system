// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router";
import { isAuthenticated } from "../utils/auth";

const PrivateRoute = ({ children }) => {
	return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
