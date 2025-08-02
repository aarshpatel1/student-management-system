import { ScrollTop } from "primereact/scrolltop";
import { BrowserRouter, Routes, Route } from "react-router";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/dashboard"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</BrowserRouter>

			<ScrollTop
				target="parent"
				threshold={100}
				className="w-2rem h-2rem border-round bg-primary"
				icon="pi pi-arrow-up text-base"
			/>
		</>
	);
}
