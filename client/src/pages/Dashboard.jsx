import React from "react";
import { useEffect } from "react";
import { isAuthenticated } from "../utils/auth";

function Dashboard() {
	useEffect(() => {
		if (isAuthenticated()) {
			const token = localStorage.getItem("token");
		}
	}, []);
	return <h1>Dashboard</h1>;
}

export default Dashboard;
