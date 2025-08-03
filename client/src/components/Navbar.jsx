import React, { useEffect, useState, useRef } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Link } from "react-router";
import { isAuthenticated } from "../utils/auth";
import { Menu } from "primereact/menu";
import axios from "axios";
import api from "../../config/axiosConfig";

export default function Navbar() {
	const menuRight = useRef(null);

	const [currentUser, setCurrentUser] = useState({});
	const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Added for responsive

	useEffect(() => {
		// Track window width for responsive logic
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const isSmallScreen = windowWidth < 768;

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
					} catch (err) {
						console.error("Error decoding token:", err);
					}
				}
			} else {
				setCurrentUser({});
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
			// console.log("Current User:", response.data);
			setCurrentUser(response.data.user);
		} catch (error) {
			console.error("Error fetching current user:", error);
		}
	};

	const handleLogout = () => {
		// Remove token from local storage
		localStorage.removeItem("token");

		// Clear auth header
		axios.defaults.headers.common["Authorization"] = "";

		// Clear current user state
		setCurrentUser({});

		// Dispatch logout event
		window.dispatchEvent(new Event("userLoggedOut"));

		// Redirect to home page
		window.location.href = "/";
	};

	const itemRenderer = (item) => (
		<div className="p-menuitem-content">
			<a
				className="flex align-items-center p-menuitem-link"
				onClick={item.command}
			>
				<span className={item.icon} />
				<span className="mx-2">{item.label}</span>
				{item.badge && <Badge className="ml-auto" value={item.badge} />}
				{item.shortcut && (
					<span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
						{item.shortcut}
					</span>
				)}
			</a>
		</div>
	);

	const profileMenuItems = [
		{
			label: "Profile",
			items: [
				{
					label: "Settings",
					icon: "pi pi-cog",
					shortcut: "⌘+O",
					template: itemRenderer,
				},
				{
					label: "Messages",
					icon: "pi pi-inbox",
					badge: 2,
					template: itemRenderer,
				},
				{
					label: "Logout",
					icon: "pi pi-sign-out",
					shortcut: "⌘+Q",
					template: itemRenderer,
					command: handleLogout,
				},
			],
		},
		{
			separator: true,
		},
		{
			template: () => {
				return (
					<button className="w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround">
						<Avatar
							image={
								currentUser.profilePhoto &&
								currentUser.profilePhoto.url
									? currentUser.profilePhoto.url
									: ""
							}
							alt={`${
								currentUser.firstName
									? currentUser.firstName
									: ""
							}'s profile`}
							className="mr-2"
							shape="circle"
						/>
						<div className="flex flex-column align">
							<span className="font-bold">
								{currentUser.firstName} {currentUser.lastName}
							</span>
							<span className="text-sm">{currentUser.role}</span>
						</div>
					</button>
				);
			},
		},
	];

	const items = [
		{
			label: "Home",
			icon: "pi pi-home",
			url: "/",
		},
		{
			label: "Dashboard",
			icon: "pi pi-chart-bar",
			url: "/dashboard",
		},
	];

	const start = (
		<img
			alt="logo"
			src="https://primefaces.org/cdn/primereact/images/logo.png"
			height="40"
			className="mr-2"
		></img>
	);
	const end = (
		<div className="flex align-items-center gap-2">
			<InputText
				type="text"
				id="globalSearch"
				name="globalSearch"
				placeholder="Search"
				className="w-8rem sm:w-auto"
			/>
			{!isAuthenticated() ? (
				<>
					{!isSmallScreen && (
						<Link
							to="/signup"
							rel="noopener noreferrer"
							className="no-underline p-button text-white"
						>
							Signup
						</Link>
					)}
					<Link
						to="/login"
						rel="noopener noreferrer"
						className="no-underline p-button text-white"
					>
						Login
					</Link>
				</>
			) : (
				<>
					<Menu
						model={profileMenuItems}
						popup
						ref={menuRight}
						id="popup_menu_right"
						popupAlignment="right"
					/>
					<Avatar
						image={
							currentUser.profilePhoto &&
							currentUser.profilePhoto.url
								? currentUser.profilePhoto.url
								: ""
						}
						alt={`${
							currentUser.firstName ? currentUser.firstName : ""
						}'s profile`}
						shape="circle"
						size="large"
						className="ml-2"
						onClick={(event) => menuRight.current.toggle(event)}
						aria-controls="popup_menu_right"
						aria-haspopup
					/>
				</>
			)}
		</div>
	);

	return (
		<div className="card">
			<Menubar model={items} start={start} end={end} />
		</div>
	);
}
