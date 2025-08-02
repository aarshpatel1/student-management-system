import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
	const token = localStorage.getItem("token");
    // console.log(token)

	if (!token) return false;

	try {
		const decoded = jwtDecode(token);
		const now = Date.now() / 1000; // current time in seconds

		// Check if token is expired
		if (decoded.exp && decoded.exp < now) {
			localStorage.removeItem("token");
			return false;
		}

		return true;
	} catch (error) {
		console.error("Invalid token:", error);
		localStorage.removeItem("token");
		return false;
	}
};
