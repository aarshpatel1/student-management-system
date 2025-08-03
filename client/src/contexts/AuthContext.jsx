import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../../config/axiosConfig";
import { isAuthenticated } from "../utils/auth";

import axios from "axios";

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({});
	const [loading, setLoading] = useState(true);
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		// Check authentication when component mounts
		const checkAndLoadUser = () => {
			if (isAuthenticated()) {
				const token = localStorage.getItem("token");
				if (token) {
					try {
						const base64Url = token.split(".")[1];
						const base64 = base64Url
							.replace(/-/g, "+")
							.replace(/_/g, "/");
						const jsonPayload = decodeURIComponent(
							atob(base64)
								.split("")
								.map(function (c) {
									return (
										"%" +
										(
											"00" + c.charCodeAt(0).toString(16)
										).slice(-2)
									);
								})
								.join("")
						);
						const payload = JSON.parse(jsonPayload);
						const userId = payload.id;
						axios.defaults.headers.common[
							"Authorization"
						] = `Bearer ${token}`;
						fetchCurrentUser(token, userId);
						setIsAuth(true);
					} catch (err) {
						console.error("Error decoding token:", err);
						setLoading(false);
						setIsAuth(false);
					}
				} else {
					setLoading(false);
					setIsAuth(false);
				}
			} else {
				setCurrentUser({});
				setLoading(false);
				setIsAuth(false);
			}
		};

		// Initial check when component mounts
		checkAndLoadUser();

		const handleUserLoggedIn = () => {
			checkAndLoadUser();
		};

		const handleUserLoggedOut = () => {
			axios.defaults.headers.common["Authorization"] = "";
			localStorage.removeItem("token");
			setCurrentUser({});
			setIsAuth(false);
		};

		// Listen for login and logout events
		window.addEventListener("userLoggedIn", handleUserLoggedIn);
		window.addEventListener("userLoggedOut", handleUserLoggedOut);

		return () => {
			window.removeEventListener("userLoggedIn", handleUserLoggedIn);
			window.removeEventListener("userLoggedOut", handleUserLoggedOut);
		};
	}, []);

	const fetchCurrentUser = async (token, userId) => {
		try {
			const response = await api.get(`/user/getUser/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setCurrentUser(response.data.user);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching current user:", error);
			setLoading(false);
		}
	};

	const logout = () => {
		// Remove token from local storage
		localStorage.removeItem("token");

		// Clear auth header
		axios.defaults.headers.common["Authorization"] = "";

		// Clear current user state
		setCurrentUser({});
		setIsAuth(false);

		// Dispatch logout event
		window.dispatchEvent(new Event("userLoggedOut"));
	};

	// Decode token function that can be used anywhere
	const decodeToken = (token) => {
		try {
			const base64Url = token.split(".")[1];
			const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
			const jsonPayload = decodeURIComponent(
				atob(base64)
					.split("")
					.map(function (c) {
						return (
							"%" +
							("00" + c.charCodeAt(0).toString(16)).slice(-2)
						);
					})
					.join("")
			);
			return JSON.parse(jsonPayload);
		} catch (err) {
			console.error("Error decoding token:", err);
			return null;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				loading,
				isAuth,
				logout,
				decodeToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the auth context
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
