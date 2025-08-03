import { BrowserRouter, Routes, Route } from "react-router";

// general
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";

// admin
import PrivateRoute from "./components/PrivateRoute";
import AddUser from "./pages/Admin/AddUser";
import EditUser from "./pages/Admin/EditUser";
import ViewUsers from "./pages/Admin/ViewUsers";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/admin/*"
						element={
							<PrivateRoute>
								<Routes>
									<Route
										path="dashboard"
										element={<Dashboard />}
									/>
									<Route
										path="addUser"
										element={<AddUser />}
									/>
									<Route
										path="editUser/:id"
										element={<EditUser />}
									/>
									<Route
										path="viewUsers"
										element={<ViewUsers />}
									/>
								</Routes>
							</PrivateRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
