import { BrowserRouter, Routes, Route } from "react-router";

// general
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// admin
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";

// faculty
import AddFaculty from "./pages/Faculty/AddFaculty";
import EditFaculty from "./pages/Faculty/EditFaculty";
import ViewFaculties from "./pages/Faculty/ViewFaculties";

// student
import AddStudent from "./pages/Student/AddStudent";
import EditStudent from "./pages/Student/EditStudent";
import ViewStudents from "./pages/Student/ViewStudents";

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
										path="faculty/add"
										element={<AddFaculty />}
									/>
									<Route
										path="faculty/edit/:id"
										element={<EditFaculty />}
									/>
									<Route
										path="faculty/view"
										element={<ViewFaculties />}
									/>
									<Route
										path="student/add"
										element={<AddStudent />}
									/>
									<Route
										path="student/edit/:id"
										element={<EditStudent />}
									/>
									<Route
										path="student/view"
										element={<ViewStudents />}
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
