import { ScrollTop } from "primereact/scrolltop";
import { BrowserRouter, Routes, Route } from "react-router";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/dashboard" element={<Dashboard />} />
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
